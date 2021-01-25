import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import * as Actions from '../../../actions';
import { GenericDoubleBottomButton, Separator } from '../../utils/StatelessComponents';
import noProfile from '../../../assets/noProfile.png';
import itsAMatch from '../../../assets/itsAMatch.png';
import Styles from './YouHaveAMatch.module.css';

export default function YouHaveAMatch({ matchProfile }) {

    Modal.setAppElement('#root');

    const dispatch = useDispatch();

    const { userData } = useSelector(state => state.dashboard);
    const { isYouHaveAMatchModalOpen } = useSelector(state => state.modal);
    const { showLoader } = useSelector(state => state.utils);

    const handleSendMessage = () => {
        dispatch(Actions.openYouHaveAMatchModal(false, matchProfile));
        dispatch(Actions.openChatPanel(true));
    }

    const handleClose = () => {
        dispatch(Actions.openYouHaveAMatchModal(false, null));
    }

    const matchPictures = () => {

        return <>
            <div className={Styles.matchPicturesDiv}>
                {
                    userData.userImages && userData.userImages.length > 0 ?
                        <img src={userData.userImages[0].imageUrl} />
                        :
                        <img style={{ backgroundSize: 'contain' }} src={noProfile} />
                }

                {
                    matchProfile && matchProfile.userImages && matchProfile.userImages.length > 0 ?
                        <img src={matchProfile.userImages[0].imageUrl} />
                        :
                        <img style={{ backgroundSize: 'contain' }} src={noProfile} />
                }
            </div>
        </>
    }

    const modalStyle = {
        overlay: {
            backgroundColor: !showLoader && 'var(--opaqueBlackBackgroundColor)',
        }
    }

    return (
        <Modal
            isOpen={isYouHaveAMatchModalOpen}
            onRequestClose={handleClose}
            style={modalStyle}
            className={'modal'}
        >

            <div className={Styles.coreContent}>

                <img className={Styles.itsAMatchLogo} src={itsAMatch} />

                <Separator text={null} />

                <h1 className="h2">
                    {`Você e ${matchProfile && matchProfile.firstName} deram like um no outro.`}
                </h1>

                {matchPictures()}

                <div className={Styles.GenericBottomButtonsDiv}>

                    <GenericDoubleBottomButton
                        mainDivCustomStyle={{ flexDirection: 'column' }}
                        buttonsCustomStyle={{ width: '80%' }}
                        button1Type={'button'}
                        button2Type={'submit'}
                        button1Click={() => handleSendMessage()}
                        button2Click={() => handleClose()}
                        button1Text={'Enviar mensagem'}
                        button2Text={'Continuar a passar'}
                    />

                </div>
            </div>
        </Modal>
    );
}
