import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as userThunk from '../../../../../../../store/user/thunk';
import { GenericContainer } from '../../../../../../../GlobalStyle';
import ConfigurationContent from './components/ConfigurationContent';
import ConfigToolbar from './components/ConfigToolbar';

export default function Configuration(props) {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(userThunk.getUserData());
    }, []);

    return <GenericContainer>

        <ConfigToolbar {...props} />

        <ConfigurationContent />

    </GenericContainer>
}
