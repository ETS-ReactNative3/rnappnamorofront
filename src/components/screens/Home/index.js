import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import logo from '../../../assets/logo.png';
import appBackgroundOpaque from '../../../assets/appBackgroundOpaque.jpg';
import { AppLogo, ImageBackgroundContainer } from '../../commonComponents';
import LoginCard from './Components/LoginCard';

export default function Home(props) {

    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        isAuthenticated && props.navigation.push('Dashboard');
    }, [isAuthenticated]);

    return (
        <ImageBackgroundContainer source={appBackgroundOpaque}>

            <AppLogo source={logo} />

            <LoginCard {...props} />

        </ImageBackgroundContainer>
    )
}
