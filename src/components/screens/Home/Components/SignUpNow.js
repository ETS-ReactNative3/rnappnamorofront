import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { P, GenericRowView } from '../../../../GlobalStyle';
import * as Actions from '../../../../actions';

const SignUpNowContainer = styled(GenericRowView)`
    margin-top: 40px;
    justify-content: center;      
`;

const Text1 = styled(P)`
    font-size: 13px;
`;

const Text2 = styled(P)`
    color: ${props => props.theme.$defaultGreen};
    font-size: 14px;
`;

export default function SignUpNow() {

    const dispatch = useDispatch();

    const showSignUpModal = () => dispatch(Actions.showSignUpModal(true));

    return <SignUpNowContainer>
        <Text1>Ainda não possui conta? <Text2 className="p" onPress={showSignUpModal}>Cadastre-se agora!</Text2></Text1>
    </SignUpNowContainer>
}
