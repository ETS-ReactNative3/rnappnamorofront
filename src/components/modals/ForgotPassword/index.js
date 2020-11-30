import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Classes from 'classnames';
import AsyncStorage from '@react-native-community/async-storage';

import * as Actions from '../../../actions';
import Styles from './ForgotPassword.module.css';
import Api from '../../utils/Api';
import { successNotification } from '../../utils/Notifications';
import { handleError } from '../../utils/Functions';
import {
    FormCloseButton,
    Separator,
    InputWithIconButton,
    GenericBottomButton
} from '../../utils/StatelessComponents';

export default () => {

    Modal.setAppElement('#root');

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const changeEmail = (value) => setEmail(value.target.value);

    const { isForgotPasswordModalOpen } = useSelector(state => state.modal);
    const { showLoader } = useSelector(state => state.utils);

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

    const modalStyle = {
        overlay: {
            backgroundColor: !showLoader && 'var(--opaqueAppBackgroundColor)',
        }
    }

    return (
        <Modal
            isOpen={isForgotPasswordModalOpen}
            onRequestClose={handleClose}
            style={modalStyle}
            className={Classes({ [Styles.modal]: true, "modal": true })}
        >
            <form
                className={Classes({ [Styles.form]: true, "form": true })}
                onSubmit={handleSendRecoverPasswordEmail}>

                <FormCloseButton handleClose={handleClose}/>

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

                <div className={Classes({ "fullWidthDiv": true, [Styles.divSendEmail]: true })} >
                    <p className="p">Enviaremos um e-mail contendo os passos para resetar sua senha!</p>
                </div>
            </form>
        </Modal>
    );
}
