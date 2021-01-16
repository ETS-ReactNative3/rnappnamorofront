import React from 'react';

import logo from '../../../assets/logo.png';
import appBackgroundOpaque from '../../../assets/appBackgroundOpaque.jpg';
import { AppLogo, ImageBackgroundContainer } from '../../commonComponents';
import LoginCard from './Components/LoginCard';

export default function Home(props) {

    return (
        <ImageBackgroundContainer source={appBackgroundOpaque}>

            <AppLogo source={logo} />

            <LoginCard {...props} />

        </ImageBackgroundContainer>
    )
}
