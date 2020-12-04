import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import * as Actions from '../../../actions';
import { ForgotPasswordContainer } from './ForgotPasswordStyle';
import Api from '../../utils/Api';
import { successNotification } from '../../utils/Notifications';
import { handleError } from '../../utils/Functions';
import { H2 } from '../../../GlobalStyle';
import { GenericModalContainer, TextInputRightIconButton } from '../../commonComponents';

export default function ForgotPassword() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const handleSendRecoverPasswordEmail = async (event) => {
        try {
            event.preventDefault();
            dispatch(Actions.showLoader(true));

            const accessToken = AsyncStorage.getItem('accessToken');
            await Api({ accessToken }).post('account/send_recovery_password_email', { email });

            dispatch(Actions.showLoader(false));
            successNotification('E-mail enviado, verifique sua caixa de entrada.');

            handleClose();
        } catch (err) {

            dispatch(Actions.showLoader(false));
            handleError(err);
        }
    }

    const handleClose = () => {
        setEmail('');
        dispatch(Actions.showForgotPasswordModal(false));
    }

    return <ForgotPasswordContainer>
        <GenericModalContainer title={'Digite seu email abaixo'}>

            <TextInputRightIconButton
                placeholder={'Email'}
                value={email}
                returnKeyType={'done'}
                onChangeText={(value) => setEmail(value)}
            />

            {/* <View
                className={'form'}
                onSubmit={handleSendRecoverPasswordEmail}>

                <FormCloseButton handleClose={handleClose} />

                <h1 className="h1">Digite seu e-mail abaixo</h1>

                <Separator text={null} />

                <InputWithIconButton
                    type={"email"}
                    name={"email"}
                    placeholder={"E-mail"}
                    required={true}
                    value={email}
                    onChange={changeEmail}
                    showRightButton={false}
                />

                <GenericBottomButton
                    type={'submit'}
                    onClick={() => null}
                    buttonText={'Enviar'}
                />

                <div className={'fullWidthDiv'} >
                    <p className="p">Enviaremos um e-mail contendo os passos para resetar sua senha!</p>
                </div>
            </View> */}
        </GenericModalContainer>
    </ForgotPasswordContainer>
}
