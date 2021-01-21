import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as Actions from '../../../../../../../actions';
import { theme } from '../../../../../../../constants/StyledComponentsTheme';
import { Toolbar, GenericScrollView } from '../../../../../../commonComponents';
import { GenericContainer } from '../../../../../../../GlobalStyle';
import PicturesEditor from './components/PicturesEditor';
import UserInfoEditor from './components/UserInfoEditor';

export default function EditInfo(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getUserData());
    }, []);

    return <GenericContainer>

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

    </GenericContainer>
}
