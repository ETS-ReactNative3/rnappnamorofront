import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Classes from 'classnames';

import * as Actions from '../../../actions';
import Styles from './TurnOnLocation.module.css';
import { FormCloseButton, WeFoundALocationProblem, GenericBottomButton } from '../../utils/StatelessComponents';

export default () => {

    Modal.setAppElement('#root');

    const dispatch = useDispatch();

    const { isTurnOnLocationModalOpen } = useSelector(state => state.modal);

    const handleClose = () => {
        dispatch(Actions.showTurnOnLocationModal(false));
    }

    const modalStyle = {
        overlay: {
            backgroundColor: 'var(--opaqueAppBackgroundColor)',
        }
    }

    return (
        <Modal
            isOpen={isTurnOnLocationModalOpen}
            onRequestClose={handleClose}
            style={modalStyle}
            className={Classes({ [Styles.modal]: true, "modal": true })}
        >
            <form
                className={Classes({ [Styles.form]: true, "form": true })}
                onSubmit={handleClose}>
                    
                <FormCloseButton handleClose={handleClose} />

                <WeFoundALocationProblem />

                <GenericBottomButton
                    onClick={() => null}
                    buttonText={'Entendi'}
                />
            </form>
        </Modal>
    );
}
