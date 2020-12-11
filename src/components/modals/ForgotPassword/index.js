import React, { useState } from "react";
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from '../../../actions';
import { ForgotPasswordContainer, PCustom } from './ForgotPasswordStyle';
import Api from '../../utils/Api';
import { successNotification, dangerNotification } from '../../utils/Notifications';
import { handleError, emailValidator } from '../../utils/Functions';
import { GenericModalContainer, TextInputRightIconButton, GenericAppButton } from '../../commonComponents';

export default function ForgotPassword(props) {

    const dispatch = useDispatch();

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    const { accessToken } = useSelector(state => state.auth);

    const sendRecoverPasswordEmail = async () => {
        try {

            if (emailValidator(forgotPasswordEmail)) {

                Keyboard.dismiss();

                dispatch(Actions.showLoader(true));

                await Api({ accessToken }).post('account/send_recovery_password_email', { email: forgotPasswordEmail });

                dispatch(Actions.showLoader(false));
                successNotification('E-mail enviado, verifique sua caixa de entrada.');

                props.navigation.goBack();
            }
            else dangerNotification('Digite um email válido!');

        } catch (err) {

            dispatch(Actions.showLoader(false));
            handleError(err);
        }
    }

    return <ForgotPasswordContainer>
        <GenericModalContainer {...props} title={'Digite seu email abaixo'}>

            <TextInputRightIconButton
                placeholder={'Email'}
                value={forgotPasswordEmail}
                returnKeyType={'done'}
                onChangeText={(value) => setForgotPasswordEmail(value)}
            />

            <GenericAppButton
                customButtonStyle={{ margin: 30, width: 'auto' }}
                textButton={'ENVIAR'}
                onPress={() => sendRecoverPasswordEmail()}
            />

            <PCustom>Enviaremos um e-mail contendo os passos para resetar sua senha!</PCustom>

        </GenericModalContainer>
    </ForgotPasswordContainer>
}
