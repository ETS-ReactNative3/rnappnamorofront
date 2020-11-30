import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Classes from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import noProfile from '../../../../assets/noProfile.png';
import Styles from './ChatPanel.module.css';

export default () => {

    const phrases = [
        'Quebre barreiras!',
        'Faça uma piada sobre si mesmo.',
        'Os elogios nunca são demais!',
        'Seja artístico!',
        'Convidar para comer nunca fez mal a ninguém!',
        'Não tenha medo de ser vulnerável!'
    ];

    const { selectedMatchProfileData, realTimeFirebaseChat, userData } = useSelector(state => state.dashboard);

    const [chatMessages, setChatMessages] = useState([]);
    const [phraseIndex, setPhraseIndex] = useState([Math.floor(Math.random() * phrases.length)]);

    useEffect(() => {//sets a random number to show a random tip message to the user:
        setPhraseIndex([Math.floor(Math.random() * phrases.length)]);
    }, [selectedMatchProfileData]);

    useEffect(() => {

        if (selectedMatchProfileData) {
            setChatMessages([]);
            setChatMessages(realTimeFirebaseChat.filter(item =>
                item.userId_1 == selectedMatchProfileData.id || item.userId_2 == selectedMatchProfileData.id && item
            ).reverse());
        }

    }, [selectedMatchProfileData, realTimeFirebaseChat]);

    const renderMessages = () => {

        return chatMessages.map((item, index) => {

            return <div key={index} className={Styles.messageBalloonDiv}>

                <div className={Classes({
                    [Styles.messageBalloon]: true,
                    [Styles.messageBalloonRight]: item.userId_1 == userData.id,
                    [Styles.messageBalloonLeft]: item.userId_1 != userData.id
                })}>

                    <label className={Styles.messageBalloonTextLabel}>{item.message}</label>

                    <label style={{ color: item.userId_1 != userData.id && 'var(--lightTextColor)' }}
                        className={Styles.messageBalloonTimeLabel}>{item.hourMinute}
                    </label>
                </div>
            </div>
        });
    }

    const renderHelloSaySomething = () => {
        return <div className={Styles.helloSaySomething}>
            {
                selectedMatchProfileData && selectedMatchProfileData.UserImages.length > 0 ?
                    <img
                        src={selectedMatchProfileData.UserImages[0].imageUrl}
                    />
                    :
                    <img
                        style={{ backgroundSize: 'contain' }}
                        src={noProfile}
                    />
            }

            <label>
                Dica: {phrases[phraseIndex]}
            </label>
        </div>
    }

    let scrollbars;

    const setScrollToTheBottom = () => {
        scrollbars.scrollToBottom()
    }

    useEffect(() => {
        setScrollToTheBottom();
    }, [chatMessages]);

    return (
        <div className={Styles.messagesDiv}>

            <Scrollbars autoHide
                ref={thisScrollbar => scrollbars = thisScrollbar}
                renderTrackHorizontal={props => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}//removes horizontal bar
            >

                {chatMessages.length > 0 ? renderMessages() : renderHelloSaySomething()}

            </Scrollbars>

        </div >
    )
}
