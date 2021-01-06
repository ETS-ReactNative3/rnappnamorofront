import React from "react";

import SignUpFields from './Components/SignUpFields';
import { GenericModalContainer } from '../../commonComponents';

export default function SignUp(props) {
    return <GenericModalContainer {...props} title={'Criar nova conta'}>
        <SignUpFields />
    </GenericModalContainer>
}
