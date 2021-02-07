import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import * as Actions from '../../../actions';
import { decodeJwtToken } from '../../utils/Functions';
import DashboardTabNavigator from './components/DashboardTabNavigator';
import { GenericContainer } from '../../../GlobalStyle';

export default function Dashboard() {

    const dispatch = useDispatch();

    useEffect(() => {
        dashboardInitialization();
    }, []);

    const dashboardInitialization = async () => {

        const accessToken = await AsyncStorage.getItem('accessToken');

        //needs the id to be used when download data from resource server:
        dispatch(Actions.updateUserDataOnRedux({ id: decodeJwtToken(accessToken).id }));
        dispatch(Actions.updateAccessTokenOnRedux(accessToken));
        dispatch(Actions.checkIfTokenHasExpired());
    }

    return (
        <GenericContainer>
            <DashboardTabNavigator />
        </GenericContainer>
    )
}
