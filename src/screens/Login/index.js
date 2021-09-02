import React from 'react';

import logo from '../../assets/logo.png';
import appBackgroundOpaque from '../../assets/appBackgroundOpaque.jpg';
import { AppLogo, ImageBackgroundContainer } from '../../components';
import LoginCard from './LoginCard';

export default function Login(props) {

    return (
        <ImageBackgroundContainer source={appBackgroundOpaque}>

            <AppLogo source={logo} />

            <LoginCard {...props} />

        </ImageBackgroundContainer>
    )
}
