import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import Geocoder from 'react-native-geocoding';
import * as RootNavigationRef from '../routes/RootNavigationRef';

import { REACT_APP_GEOCODE_API_KEY } from 'react-native-expand-dotenv';
import * as Types from '../constants/Types';
import { handleActionError } from '../actions/handleError';
import { getNextProfileForTheMatchSearcher } from '../actions/match';

Geocoder.init(REACT_APP_GEOCODE_API_KEY, { language: 'pt-br' });

export function showLoader(show) {
    return ({
        type: Types.SHOW_LOADER,
        showLoader: show
    })
}

export function updateIsGettingLocation(isGettingLocation) {
    return {
        type: Types.IS_GETTING_LOCATION,
        isGettingLocation
    }
}

export function getAddress() {
    return async dispatch => {

        const handleGeolocationError = (error) => {

            dispatch(updateIsGettingLocation(false));

            dispatch({
                type: Types.IS_GEOLOCATION_ENABLE,
                isGeolocationEnabled: false
            })

            RootNavigationRef.push('TurnOnLocationModal');

            dispatch(handleActionError(error));
        }

        dispatch(updateIsGettingLocation(true));

        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Libere o acesso a sua localização!",
                message: 'O App Namoro precisa acessar sua localização para encontrar pessoas próximas.',
                buttonNeutral: "Perguntar depois",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
            }
        );

        Geolocation.getCurrentPosition(
            (position) => {

                let lat = position?.coords?.latitude;
                let lng = position?.coords?.longitude;

                Geocoder.from({ lat, lng }).then(json => {

                    const address = json.results[6].formatted_address;

                    dispatch({
                        type: Types.IS_GEOLOCATION_ENABLE,
                        isGeolocationEnabled: true
                    })

                    dispatch(updateUserDataOnRedux({
                        address,
                        currentLongitude: lng,
                        currentLatitude: lat
                    }));

                    dispatch(updateUser({
                        lastLongitude: lng,
                        lastLatitude: lat
                    }));

                    dispatch(updateIsGettingLocation(false));

                    dispatch(getNextProfileForTheMatchSearcher());

                }).catch(error => handleGeolocationError(error));
            },
            (error) => {
                handleGeolocationError(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }
}
