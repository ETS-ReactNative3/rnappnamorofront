import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { P, GenericRowView } from '../../../../GlobalStyle';
import * as Actions from '../../../../actions';

export default function ForgotPassword(props) {

    const dispatch = useDispatch();

    // const showForgotPasswordModal = () => dispatch(Actions.showForgotPasswordModal(true));
    const showForgotPasswordModal = () => props.navigation.push('ForgotPassword');

    const ForgotPasswordContainer = styled(GenericRowView)`
        margin-top: 15px;
        justify-content: flex-end;      
        width: 100%;
    `;

    const Text = styled(P)`
    font-size: 14px;
        color: ${props => props.theme.$defaultGreen};
    `;

    return <ForgotPasswordContainer>
        <Text onPress={showForgotPasswordModal}>Esqueceu a senha?</Text>
    </ForgotPasswordContainer>
}
