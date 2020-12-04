import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Classes from 'classnames';
import AsyncStorage from '@react-native-community/async-storage';

import { successNotification } from '../../utils/Notifications';
import { handleError } from '../../utils/Functions';
import Api from '../../utils/Api';
import {
    FormCloseButton,
    Separator,
    InputWithIconButton,
    TextArea,
    GenericBottomButton
} from '../../utils/StatelessComponents';
import * as Actions from '../../../actions';
import Styles from './Contact.module.css';

export default () => {

    Modal.setAppElement('#root');

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const changeName = (value) => setName(value.target.value);
    const changeEmail = (value) => setEmail(value.target.value);
    const changeSubject = (value) => setSubject(value.target.value);
    const changeMessage = (value) => setMessage(value.target.value);

    const { isContactModalOpen } = useSelector(state => state.modal);
    const { showLoader } = useSelector(state => state.utils);

    const handleCreateNewUserContact = async (event) => {
        try {
            event.preventDefault();
            dispatch(Actions.showLoader(true));

            const accessToken = AsyncStorage.getItem('accessToken');
            await Api({ accessToken }).post('users/contact', { name, email, subject, message });

            dispatch(Actions.showLoader(false));
            successNotification('Contato enviado com sucesso! Obrigado por nos contactar.');

            handleClose();
        } catch (err) {

            dispatch(Actions.showLoader(false));
            handleError(err);
        }
    }

    const handleClose = () => {
        dispatch(Actions.showContactModal(false));
    }

    const modalStyle = {
        overlay: {
            backgroundColor: !showLoader && 'var(--opaqueBackgroundColor)',
        }
    }

    const contactFields = () => {
        return <>
            <InputWithIconButton
                type={"text"}
                name={"name"}
                placeholder={"Nome"}
                required={true}
                value={name}
                onChange={changeName}
                showRightButton={false}
            />

            <InputWithIconButton
                type={"email"}
                name={"email"}
                placeholder={"E-mail"}
                required={true}
                value={email}
                onChange={changeEmail}
                showRightButton={false}
            />

            <InputWithIconButton
                type={"text"}
                name={"subject"}
                placeholder={"Assunto"}
                required={true}
                value={subject}
                onChange={changeSubject}
                showRightButton={false}
            />

            <TextArea
                name={"message"}
                placeholder={"Mensagem"}
                required={true}
                value={message}
                onChange={changeMessage}
            />
        </>
    }

    return (
        <Modal
            isOpen={isContactModalOpen}
            onRequestClose={handleClose}
            style={modalStyle}
            className={Classes({ [Styles.modal]: true, "modal": true })}
        >
            <form
                className={Classes({ [Styles.form]: true, "form": true })}>

                <FormCloseButton handleClose={handleClose} />

                <h1 className="h1">Fale conosco!</h1>

                <Separator text={null} />

                {contactFields()}

                <GenericBottomButton
                    onClick={() => handleCreateNewUserContact()}
                    buttonText={'Enviar'}
                />
            </form>
        </Modal>
    );
}
