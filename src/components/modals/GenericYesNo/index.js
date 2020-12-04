import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Classes from 'classnames';
import AsyncStorage from '@react-native-community/async-storage';

import * as Actions from '../../../actions';
import Styles from './GenericYesNo.module.css';
import { FormCloseButton, Separator, GenericDoubleBottomButton } from '../../utils/StatelessComponents';
import { handleError } from "../../utils/Functions";

export default () => {

    Modal.setAppElement('#root');

    const dispatch = useDispatch();

    const { isGenericYesNoModalOpen } = useSelector(state => state.modal);
    const { selectedMatchProfileData } = useSelector(state => state.dashboard);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [acceptText, setAcceptText] = useState('');
    const [denyText, setDenyText] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedUserImageId, setSelectedUserImageId] = useState('');

    useEffect(() => {
        setTitle(AsyncStorage.getItem('genericYesNoModalTitle'));
        setSubtitle(AsyncStorage.getItem('genericYesNoModalSubtitle'));
        setAcceptText(AsyncStorage.getItem('genericYesNoModalAcceptText'));
        setDenyText(AsyncStorage.getItem('genericYesNoModalDenyText'));

        setSelectedMethod(AsyncStorage.getItem('genericYesNoModalSelectedMethod'));
        setSelectedUserImageId(AsyncStorage.getItem('selectedUserImageId'));
    }, [isGenericYesNoModalOpen]);

    const handleClose = () => {
        dispatch(Actions.showGenericYesNoModal(false));
    }

    const acceptMethod = (event) => {

        try {
            event.preventDefault();

            switch (selectedMethod) {
                case 'genericYesNoModalDeleteAccount':
                    dispatch(Actions.deleteAccount());
                    break;
                case 'genericYesNoModalUnmatch':
                    dispatch(Actions.unmatch(selectedMatchProfileData.id));
                    break;
                case 'genericYesNoModalDeleteUserImage':
                    dispatch(Actions.deleteUserImage(selectedUserImageId));
                    break;
                default:
                    break;
            }
        } catch (error) {
            handleError(error);
        }
    }

    const modalStyle = {
        overlay: {
            backgroundColor: 'var(--opaqueBackgroundColor)',
        }
    }

    const titleSubtitleDiv = () => {
        return <div className={Styles.titleSubtitleDiv}>
            <h2 className="h2">{title && title.toUpperCase()}</h2>

            <Separator text={null} />

            <p className="p">
                {subtitle}
            </p>
        </div>
    }

    return (
        <Modal
            isOpen={isGenericYesNoModalOpen}
            onRequestClose={handleClose}
            style={modalStyle}
            className={Classes({ [Styles.modal]: true, "modal": true })}
        >
            <form
                onSubmit={acceptMethod}
                className={Classes({ [Styles.form]: true, "form": true })}>
                    
                <FormCloseButton handleClose={handleClose} />

                {titleSubtitleDiv()}

                <GenericDoubleBottomButton
                    button1Type={'button'}
                    button2Type={'submit'}
                    button1Click={() => handleClose()}
                    button2Click={() => null}
                    button1Text={denyText && denyText.toUpperCase()}
                    button2Text={acceptText && acceptText.toUpperCase()}
                />
            </form>
        </Modal>
    );
}
