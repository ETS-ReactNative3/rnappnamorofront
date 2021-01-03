import React from 'react';
// import { useNavigation } from '@react-navigation/native';

import { GenericContainer } from '../../../../../../../GlobalStyle';
import { Toolbar } from '../../../../../../commonComponents';

export default function Configuration(props) {

    //const navigation = useNavigation();

    return <GenericContainer>

        <Toolbar
            leftElement={'arrow-back'}
            onLeftElementPress={() => navigation.goBack()}
            rightElement={'attach-file'}
            onRightElementPress={() => props.navigation.push('UserProfile')}
            title={'Detalhes do Processo'}
            showSearchIcon={false}
            customContainerStyle={{ backgroundColor: 'white' }}
        />

    </GenericContainer>
}
