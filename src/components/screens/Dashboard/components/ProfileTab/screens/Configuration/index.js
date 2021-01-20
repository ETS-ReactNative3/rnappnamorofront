import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import * as Actions from '../../../../../../../actions';
import { GenericContainer } from '../../../../../../../GlobalStyle';
import ConfigurationContent from './components/ConfigurationContent';
import ConfigToolbar from './components/ConfigToolbar';

const ConfigurationContainer = styled(GenericContainer)`
    justify-content: flex-start;
`;

export default function Configuration(props) {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(Actions.getUserData());
    }, []);

    return <ConfigurationContainer>

        <ConfigToolbar {...props} />

        <ConfigurationContent />

    </ConfigurationContainer>
}
