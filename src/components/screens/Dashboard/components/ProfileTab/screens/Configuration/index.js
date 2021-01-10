import React from 'react';
import styled from 'styled-components';

import { GenericContainer } from '../../../../../../../GlobalStyle';
import ConfigurationPanel from './components/ConfigurationPanel';
import ConfigToolbar from './components/ConfigToolbar';

const ConfigurationContainer = styled(GenericContainer)`
    justify-content: flex-start;
`;

export default function Configuration(props) {

    return <ConfigurationContainer>

        <ConfigToolbar {...props} />

        <ConfigurationPanel />

    </ConfigurationContainer>
}
