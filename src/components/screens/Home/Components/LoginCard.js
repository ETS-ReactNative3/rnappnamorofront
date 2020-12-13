import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { theme } from '../../../../constants/StyledComponentsTheme';

import { dangerNotification } from '../../../utils/Notifications'
import * as Actions from '../../../../actions';
import { LoginCardContainer } from '../HomeStyle';
import SocialButtons from './SocialButtons';
import ForgotPassword from './ForgotPassword';
import SignUpNow from './SignUpNow';
import { H2 } from '../../../../GlobalStyle';
import { LineTextLine, TextInputRightIconButton, GenericAppButton } from '../../../commonComponents';

const Styles = EStyleSheet.create({
    '@media (min-width: 0)': {
        loginCardContainer: {
            height: '$matchSearcherCardHeightMin0Width',
            width: '$matchSearcherCardWidthMin0Width'
        },
    },

    '@media(min-width: 768px)': {
        loginCardContainer: {
            height: '$matchSearcherCardHeightMin768Width',
            width: '$matchSearcherCardWidthMin768Width'
        },
    }
});

export default function LoginCard(props) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
    const tiPassword = useRef();

    const localLogin = () => {

        if (email && password) {
            const userData = { email, password };
            dispatch(Actions.signInLocalAction(userData));
        }
        else
            dangerNotification("Preencha os campos Email e Senha");
    }

    return <LoginCardContainer style={Styles.loginCardContainer}>

        <H2>Entrar</H2>

        <SocialButtons />

        <LineTextLine text={'ou'} />

        <TextInputRightIconButton
            placeholder={'Email'}
            value={email}
            returnKeyType={'next'}
            onChangeText={(value) => setEmail(value)}
            onSubmitEditing={() => tiPassword.current.focus()}
        />

        <TextInputRightIconButton
            reference={tiPassword}
            placeholder={'Senha'}
            showRightButton
            solidIcon
            value={password}
            onChangeText={(value) => setPassword(value)}
            customIconStyle={{ color: theme.$gray }}
            iconName={passwordSecureTextEntry ? 'eye-slash' : 'eye'}
            secureTextEntry={passwordSecureTextEntry}
            underlayColor={theme.$darkGray}
            onButtonPress={() => setPasswordSecureTextEntry(!passwordSecureTextEntry)}
        />

        <GenericAppButton customButtonStyle={{ marginTop: 20 }} textButton={'ENTRAR'} onPress={() => localLogin()} />

        <ForgotPassword {...props} />

        <SignUpNow {...props} />

    </LoginCardContainer>
}