import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
    ProfileGenericButton,
    SubtitleLeftElement,
    InputWithIconButton
} from '../../../../utils/StatelessComponents';
import Api from '../../../../utils/Api';
import { handleError, decodeJwtToken } from '../../../../utils/Functions';
import { successNotification } from '../../../../utils/Notifications';
import * as Actions from '../../../../../actions';
import Styles from './LeftElementComponents.module.css';

export default () => {

    const dispatch = useDispatch();

    const { userData } = useSelector(state => state.dashboard);

    const [email, setEmail] = useState(userData.email);
    const [isSendButtonEnable, setIsSendEmailButtonEnable] = useState(userData.email !== email || !userData.verifiedEmail ? true : false);

    const changeEmail = (value) => setEmail(value.target.value);

    useEffect((() => {
        setIsSendEmailButtonEnable(userData.email !== email || !userData.verifiedEmail ? true : false);
    }), [email]);

    const sendVerificationEmail = async (event) => {

        event.preventDefault();
        if (userData.email !== email || !userData.verifiedEmail) {
            try {
                dispatch(Actions.showLoader(true));

                const accessToken = AsyncStorage.getItem('accessToken');
                const userId = decodeJwtToken(accessToken).id;

                await Api({ accessToken }).post('account/send_email_verification', { email, id: userId });

                dispatch(Actions.showLoader(false));
                successNotification('E-mail enviado, verifique sua caixa de entrada.');

                dispatch(Actions.showLeftProfileEditor(false));
            } catch (err) {

                dispatch(Actions.showLoader(false));
                handleError(err);
            }
        }
    }

    return (
        <form onSubmit={sendVerificationEmail}>
            <div className={Styles.container}>

                <SubtitleLeftElement title="CONFIGURAÇÕES DA CONTA" />

                <InputWithIconButton
                    type={"email"}
                    name={"email"}
                    placeholder={"E-mail"}
                    value={email}
                    required={true}
                    onChange={changeEmail}
                    showRightButton={true}
                    iconStyle={{ color: userData.verifiedEmail && userData.email === email ? "var(--defaultBlue)" : "var(--defaultRed)" }}
                    iconName={userData.verifiedEmail && userData.email === email ? "fas fa-check" : "fas fa-times"}
                />

                <SubtitleLeftElement
                    fontSize={'13px'}
                    customStyle={{ alignItems: 'center', height: '20px' }}
                    title={userData.verifiedEmail && userData.email === email ?
                        "Este endereço de e-mail já foi verificado"
                        :
                        "Seu e-mail ainda não foi verificado, verifique-o para aumentar sua segurança"
                    }
                />

                <ProfileGenericButton
                    enable={isSendButtonEnable}
                    type="submit"
                    buttonText="Me envie um e-mail de verificação"
                />
            </div>
        </form>
    )
}
