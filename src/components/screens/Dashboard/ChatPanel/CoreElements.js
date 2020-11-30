import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Classes from 'classnames';

import * as Actions from '../../../../actions';
import { RoundButtonWithIcon } from '../../../utils/StatelessComponents';
import { convertDateFormatToDDMMYYYY } from '../../../utils/Functions';
import MessagesDiv from './MessagesDiv';
import noProfile from '../../../../assets/noProfile.png';
import Styles from './ChatPanel.module.css';

export default () => {

    const dispatch = useDispatch();

    const { selectedMatchProfileData } = useSelector(state => state.dashboard);

    const [message, setMessage] = useState('');
    const [isMessageSending, setIsMessageSending] = useState(false);

    const handleMessage = async () => {
        if (message != '' && !isMessageSending) {
            setIsMessageSending(true);

            dispatch(Actions.sendMessageToFirebase(message, selectedMatchProfileData.id))
                .then(() => {
                    setIsMessageSending(false);
                    setMessage('');
                });
        }
    }

    const handleKeyDown = (event) => {

        if (event.keyCode === 13) {//13 is the key code for Enter
            event.preventDefault()
            handleMessage();
        }
    }

    const handleCloseChatPanel = () => {
        dispatch(Actions.setSelectedMatchProfileDataAndOpenChatPanel(null, false));
    }

    const unmatch = () => {
        dispatch(Actions.showGenericYesNoModal(
            true,
            'Desfazer match?',
            'Deseja mesmo desfazer essa match? Você pode não encontrar essa pessoa novamente na busca!',
            'CONTINUAR',
            'CANCELAR',
            'genericYesNoModalUnmatch'
        ));
    }

    const matchDateDiv = () => {
        return <div className={Styles.matchDateDiv}>
            {
                selectedMatchProfileData && selectedMatchProfileData.UserImages.length > 0 ?
                    <img
                        className={Styles.profileImageIcon}
                        src={selectedMatchProfileData.UserImages[0].imageUrl}
                    />
                    :
                    <img
                        className={Styles.profileImageIcon}
                        style={{ backgroundSize: 'contain' }}
                        src={noProfile}
                    />
            }

            <label>
                {
                    selectedMatchProfileData && `Você deu match com 
                            ${selectedMatchProfileData.firstName} em 
                            ${convertDateFormatToDDMMYYYY(new Date(selectedMatchProfileData.UserMatch[0].updatedAt))}`
                }
            </label>

            <div>
                <div>
                    <RoundButtonWithIcon
                        onClick={() => handleCloseChatPanel()}
                        iconClass={'far fa-times-circle'}
                        iconStyle={{ color: 'var(--separatorColor)' }}
                    />
                </div>

                <div className={Styles.unmatchButtonDiv}>
                    <RoundButtonWithIcon
                        onClick={() => unmatch()}
                        iconClass={'fas fa-user-slash'}
                        iconStyle={{ color: 'var(--separatorColor)' }}
                    />
                </div>
            </div>
        </div>
    }

    const typeMessageDiv = () => {
        return <div className={Styles.typeMessageDiv}>
            <input
                placeholder={'Digite uma mensagem'}
                className={Styles.typeMessageInput}
                onChange={(value) => setMessage(value.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                value={message}>
            </input>

            <RoundButtonWithIcon
                onClick={() => null}
                iconClass={'far fa-smile-wink'}
                iconStyle={{ color: 'rgb(247, 148, 0)' }}
            />

            <button
                onClick={() => handleMessage()}
                className={Classes({
                    [Styles.sendMessageButton]: true,
                    [Styles.sendMessageButtonOn]: message != '',
                    [Styles.sendMessageButtonOff]: message == '',
                })}>
                {'Enviar'}
            </button>
        </div>
    }

    return (
        <div className={Styles.chatPanel}>

            {matchDateDiv()}

            <MessagesDiv />

            {typeMessageDiv()}

        </div>
    )
}
