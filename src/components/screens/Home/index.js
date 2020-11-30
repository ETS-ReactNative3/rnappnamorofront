import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../../assets/logo.png';
import appBackgroundOpaque from '../../../assets/appBackgroundOpaque.jpg';
import { ImageBackgroundContainer, BigLogo } from '../../../GlobalStyle';

import LoginCard from './LoginCard';
import * as Actions from '../../../actions';

export default function Home(props) {

    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        //dispatch(Actions.checkIfTokenHasExpired());
    }, []);

    useEffect(() => {
        isAuthenticated && props.navigation.push('Dashboard');
    }, [isAuthenticated]);

    return (
        <ImageBackgroundContainer source={appBackgroundOpaque}>

            <BigLogo source={logo} />

            <LoginCard />

        </ImageBackgroundContainer>
    )
}
