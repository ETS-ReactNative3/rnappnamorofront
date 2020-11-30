import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { REACT_APP_GOOGLE_CLIENT_ID } from 'react-native-expand-dotenv';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

import { dangerNotification } from '../../utils/Notifications'
import * as Actions from '../../../actions';
import { LoginCardContainer, SocialButtonsContainer } from './HomeStyle';
import { H2 } from '../../../GlobalStyle';
import { SocialButton, LineTextLine } from '../../commonComponents';

GoogleSignin.configure({
    webClientId: REACT_APP_GOOGLE_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export default function LoginCard() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const showForgotPasswordModal = () => dispatch(Actions.showForgotPasswordModal(true));
    const showSignUpModal = () => dispatch(Actions.showSignUpModal(true));

    const googleLogin = async () => {
        try {

            await GoogleSignin.hasPlayServices();

            !GoogleSignin.isSignedIn() && await GoogleSignin.signIn();

            const tokens = await GoogleSignin.getTokens();

            dispatch(Actions.signInOauthAction(tokens.accessToken, 'google'));

        } catch (error) {

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('operation (e.g. sign in) is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated');
            } else {
                // some other error happened
                console.log(error);
                console.log('error code', error.code);
            }
        }
    };

    const facebookLogin = () => {
        return LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {

                if (result.isCancelled) {
                    console.log("login is cancelled.");
                } else {

                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            dispatch(Actions.signInOauthAction(data.accessToken.toString(), 'facebook'));
                        }
                    )
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    const SocialButtons = () => {
        return <SocialButtonsContainer>

            <SocialButton onPress={() => facebookLogin()}
                customButtonStyle={{ backgroundColor: '#337ab7' }}
                underlayColor={'#0863b3'}
                text={'Facebook'}
                iconName={'facebook'} />

            <SocialButton onPress={() => googleLogin()}
                customButtonStyle={{ backgroundColor: '#d9534f' }}
                underlayColor={'#ca2c27'}
                text={'Google'}
                iconName={'google'} />
            {/* <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button type="button" className={Classes({ 'fullWidthButton': true, [Styles.googleButton]: true })} onClick={renderProps.onClick}>
                        <i className={Classes({ "fab fa-google": true, [Styles.i]: true })}></i><p>Entrar com <b>Google</b></p>
                    </button>
                )}
            /> */}
            {/* <Button type="button" style={Classes({ 'fullWidthButton': true, [Styles.googleButton]: true })} onClick={renderProps.onClick}>
                <i className={Classes({ "fab fa-google": true, [Styles.i]: true })}></i><p>Entrar com <b>Google</b></p>
                <IconeAwesome5 name="address-card" size={23} color={'red'} style={{ marginTop: 14, alignSelf: 'center' }} />
            </Button> */}
        </SocialButtonsContainer>
    }

    const localLogin = (event) => {
        event.preventDefault();

        if (email && password) {
            const userData = { email, password };
            dispatch(Actions.signInLocalAction(userData));
        }
        else
            dangerNotification("E-mail ou senha inválidos.");
    }

    googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const divForgotPassword = () => {
        return <View className={Styles.divForgotPassword}>
            <Text className="p" onClick={showForgotPasswordModal}>Esqueceu a senha?</Text>
        </View>
    }

    const divSignUpNow = () => {
        return <View className={Styles.divSignUpNow}>
            <Text className="h5"
                onClick={null}>
                {'Ainda não possui conta? '}
                <Text onClick={showSignUpModal}>Cadastre-se agora!</Text>
            </Text>
        </View>
    }

    return <LoginCardContainer style={Styles.loginCardContainer}>

        <H2>Entrar</H2>

        <SocialButtons />

        <LineTextLine text={'ou'} />

        {/* <Separator text="or" />

            <InputWithIconButton
                type={"email"}
                name={"email"}
                placeholder={"E-mail"}
                required={true}
                value={email}
                onChange={(value) => setEmail(value.target.value)}
                showRightButton={false}
            />

            <InputWithIconButton
                type={"password"}
                name={"password"}
                placeholder={"Senha"}
                required={true}
                value={password}
                onChange={(value) => setPassword(value.target.value)}
                showRightButton={true}
                iconName={"fa fa-eye"}
            />

            <GenericBottomButton
                type="submit"
                onClick={() => null}
                buttonText={'Entrar'}
            /> */}

        {/* {divForgotPassword()} */}

        {/* {divSignUpNow()} */}
    </LoginCardContainer>
}

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
