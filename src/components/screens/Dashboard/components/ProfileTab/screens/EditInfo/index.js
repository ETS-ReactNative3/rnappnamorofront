import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { theme } from '../../../../../../../constants/StyledComponentsTheme';
import { Toolbar, GenericScrollView, LineTextLine } from '../../../../../../commonComponents';
import { GenericContainer } from '../../../../../../../GlobalStyle';
import PicturesEditor from './components/PicturesEditor';
import UserInfoEditor from './components/UserInfoEditor';

const EditInfoContainer = styled(GenericContainer)`
    justify-content: flex-start;
`;

export default function EditInfo(props) {

    return <EditInfoContainer>

        <Toolbar
            leftElement={'arrow-back'}
            customLeftElement={{ color: 'white' }}
            onLeftElementPress={() => props.navigation.goBack()}
            title={'Editar Info'}
            customTitleText={{ alignSelf: 'flex-start', color: 'white' }}
            showSearchIcon={false}
            customContainerStyle={{ backgroundColor: theme.$primaryColor }}
        />

        <GenericScrollView>

            <PicturesEditor />

            <UserInfoEditor />

        </GenericScrollView>

    </EditInfoContainer>
}
