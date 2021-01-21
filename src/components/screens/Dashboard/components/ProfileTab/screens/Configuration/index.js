import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as Actions from '../../../../../../../actions';
import { GenericContainer } from '../../../../../../../GlobalStyle';
import ConfigurationContent from './components/ConfigurationContent';
import ConfigToolbar from './components/ConfigToolbar';

export default function Configuration(props) {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(Actions.getUserData());
    }, []);

    return <GenericContainer>

        <ConfigToolbar {...props} />

        <ConfigurationContent />

    </GenericContainer>
}
