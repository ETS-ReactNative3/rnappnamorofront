import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { GenericContainer } from '../../../../../../../GlobalStyle';
import ConfigToolbar from '../Configuration/components/ConfigToolbar';
import EmailEditor from './components/EmailEditor';

const ConfigurationContainer = styled(GenericContainer)`
    justify-content: flex-start;
`;

export default function ConfigurationEditor(props) {

    const { selectedConfigMenu } = useSelector(state => state.dashboard);

    const RenderBody = () => {
        switch (selectedConfigMenu) {
            case 'emailEditor':
                return <EmailEditor />
            case 'phoneEditor':
                return <EmailEditor />
            case 'locationEditor':
                return <EmailEditor />
            case 'searchingByEditor':
                return <EmailEditor />
            default:
                return null;
        }
    }

    return <ConfigurationContainer>

        <ConfigToolbar {...props} />

        <RenderBody />

    </ConfigurationContainer>
}
