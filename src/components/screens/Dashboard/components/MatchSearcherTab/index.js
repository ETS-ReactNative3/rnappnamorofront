import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { InfoText } from '../../../../../constants/InfoText';
import { GenericContainer } from '../../../../../GlobalStyle';
import MatchSearcherInformation from './components/MatchSearcherInformation';
import ProfileCard from './components/ProfileCard';
import ControlButtons from './components/ControlButtons';

const MainContainer = styled(GenericContainer)`
    background-color: ${props => props.theme.$darkerBackgroundColor};
`;

export default function MatchSearcherTab() {

    const { matchSearcherProfiles, isGettingProfileForTheMatchSearcher } = useSelector(state => state.dashboard);
    const { showMeOnApp } = useSelector(state => state.dashboard.userData);
    const { isGeolocationEnabled, isGettingLocation } = useSelector(state => state.utils);
    const { weFoundAProblem, turnOnShowMeOnApp, turnOnLocation } = InfoText;
    const matchSearcherProfilesLength = matchSearcherProfiles.length;

    const MatchSeacherBody = () => {
        return (isGettingProfileForTheMatchSearcher || isGettingProfileForTheMatchSearcher == null || isGettingLocation) && matchSearcherProfilesLength == 0 ? <MatchSearcherInformation bodyText={'Buscando perfis...'} />
            :
            !showMeOnApp ? <MatchSearcherInformation title={weFoundAProblem} bodyText={turnOnShowMeOnApp} />
                :
                !isGeolocationEnabled ? <MatchSearcherInformation title={weFoundAProblem} bodyText={turnOnLocation} />
                    :
                    matchSearcherProfilesLength > 0 ? <ProfileCard currentProfile={matchSearcherProfiles[0]} />
                        :
                        <MatchSearcherInformation bodyText={'Oops, não encontramos ninguém próximo a você. Tente aumentar sua "Distância máxima" ou a\n"Faixa etária" no menu "Configurações".\nBoa sorte!'} />
    }

    const ControlButtonSection = () => matchSearcherProfilesLength > 0 && <ControlButtons currentProfile={matchSearcherProfiles[0]} />

    return <MainContainer>

        <MatchSeacherBody />

        <ControlButtonSection />

    </MainContainer>
}
