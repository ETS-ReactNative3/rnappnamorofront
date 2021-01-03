import React from "react";

import SignUpFields from './Components/SignUpFields';
import { GenericModalContainer } from '../../commonComponents';
import { SignUpContainer } from './SignUpStyle';

export default function SignUp(props) {
    return (
        <SignUpContainer>
            <GenericModalContainer {...props} title={'Criar nova conta'}>

                <SignUpFields />

            </GenericModalContainer>
        </SignUpContainer>
    );
}
