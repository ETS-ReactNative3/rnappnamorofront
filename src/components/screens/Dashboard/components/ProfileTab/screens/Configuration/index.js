import React from 'react';
import styled from 'styled-components';

import { theme } from '../../../../../../../constants/StyledComponentsTheme';
import { GenericContainer } from '../../../../../../../GlobalStyle';
import { Toolbar } from '../../../../../../commonComponents';
import ConfigurationPanel from './components/ConfigurationPanel';

const ConfigurationContainer = styled(GenericContainer)`
    justify-content: flex-start;
`;

export default function Configuration(props) {

    return <ConfigurationContainer>

        <Toolbar
            leftElement={'arrow-back'}
            customLeftElement={{ color: 'white' }}
            onLeftElementPress={() => props.navigation.push('UserProfile')}
            title={'Configurações'}
            customTitleText={{ alignSelf: 'flex-start', color: 'white' }}
            showSearchIcon={false}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <ConfigurationPanel />

    </ConfigurationContainer>
}
