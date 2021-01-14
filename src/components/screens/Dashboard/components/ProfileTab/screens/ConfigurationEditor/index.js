import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { GenericContainer } from '../../../../../../../GlobalStyle';
import ConfigToolbar from '../Configuration/components/ConfigToolbar';
import EmailEditor from './components/EmailEditor';
import PhoneEditor from './components/PhoneEditor';
import LocationEditor from './components/LocationEditor';
import SearchingByEditor from './components/SearchingByEditor';
import { SectionTitle } from '../../../../../../commonComponents';

const MainContainer = styled(GenericContainer)`
    justify-content: flex-start;
`;

const BodyContainer = styled(GenericContainer)`
    justify-content: flex-start;
    padding-left: 10px;
    padding-right: 10px;
`;

export default function ConfigurationEditor(props) {

    const { selectedConfigMenu, selectedConfigMenuTitle } = useSelector(state => state.dashboard);

    const RenderBody = () => {
        switch (selectedConfigMenu) {
            case 'emailEditor':
                return <EmailEditor />
            case 'phoneEditor':
                return <PhoneEditor navigation={props.navigation}/>
            case 'locationEditor':
                return <LocationEditor />
            case 'searchingByEditor':
                return <SearchingByEditor />
            default:
                return null;
        }
    }

    return <MainContainer>

        <ConfigToolbar {...props} />

        <SectionTitle titleText={selectedConfigMenuTitle} />

        <BodyContainer>
            <RenderBody />
        </BodyContainer>

    </MainContainer>
}
