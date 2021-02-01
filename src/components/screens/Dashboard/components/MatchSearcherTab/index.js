import React from 'react';
import { useSelector } from 'react-redux';

import { GenericContainer } from '../../../../../GlobalStyle';
import { InfoText } from '../../../../../constants/InfoText';
import MatchSearcherInformation from './components/MatchSearcherInformation';
import ProfileCard from './components/ProfileCard';

export default function MatchSearcherTab() {

    const { matchSearcherProfiles, isGettingProfileForTheMatchSearcher } = useSelector(state => state.dashboard);
    const { showMeOnApp } = useSelector(state => state.dashboard.userData);

    const { isGeolocationEnabled, isGettingLocation } = useSelector(state => state.utils);

    const MatchSeacherBody = () => {
        return isGettingProfileForTheMatchSearcher || isGettingProfileForTheMatchSearcher == null || isGettingLocation ? <MatchSearcherInformation bodyText={'Buscando perfis...'} />
            :
            !showMeOnApp ? <MatchSearcherInformation title={InfoText.weFoundAProblem} bodyText={InfoText.turnOnShowMeOnApp} />
                :
                !isGeolocationEnabled ? <MatchSearcherInformation title={InfoText.weFoundAProblem} bodyText={InfoText.turnOnLocation} />
                    :
                    matchSearcherProfiles.length > 0 ? <ProfileCard profile={matchSearcherProfiles[0]} />
                        :
                        <MatchSearcherInformation bodyText={'Oops, não encontramos ninguém próximo a você. Tente aumentar sua "Distância máxima" ou a\n"Faixa etária" no menu "Configurações".\nBoa sorte!'} />
    }

    return <GenericContainer>
        <MatchSeacherBody />
    </GenericContainer>
}
