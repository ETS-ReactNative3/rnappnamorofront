import React from "react";
import styled from 'styled-components';

import SignUpFields from './Components/SignUpFields';
import { GenericModalContainer } from '../../commonComponents';
import { GenericContainer } from '../../../GlobalStyle';

export const SignUpContainer = styled(GenericContainer)`
    padding: 10px;
`;

export default function SignUp(props) {
    return (
        <SignUpContainer>
            <GenericModalContainer {...props} title={'Criar nova conta'}>

                <SignUpFields />

            </GenericModalContainer>
        </SignUpContainer>
    );
}
