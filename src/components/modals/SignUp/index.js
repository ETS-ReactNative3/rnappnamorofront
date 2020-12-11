import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

import SignUpFields from './Components/SignUpFields';
import { GenericModalContainer } from '../../commonComponents';
import { SignUpContainer } from './SignUpStyle';

export default function SignUp(props) {

    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        isAuthenticated && props.navigation.goBack();
    }, [isAuthenticated]);

    return (
        <SignUpContainer>
            <GenericModalContainer {...props} title={'Criar nova conta'}>

                <SignUpFields />

            </GenericModalContainer>
        </SignUpContainer>
    );
}
