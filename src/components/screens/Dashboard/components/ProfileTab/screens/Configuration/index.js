import React from 'react';
import styled from 'styled-components';

import { GenericContainer } from '../../../../../../../GlobalStyle';
import ConfigurationContent from './components/ConfigurationContent';
import ConfigToolbar from './components/ConfigToolbar';

const ConfigurationContainer = styled(GenericContainer)`
    justify-content: flex-start;
`;

export default function Configuration(props) {

    return <ConfigurationContainer>

        <ConfigToolbar {...props} />

        <ConfigurationContent />

    </ConfigurationContainer>
}
