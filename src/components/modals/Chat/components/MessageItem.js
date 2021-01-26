import React from 'react';
import styled from 'styled-components';

import { theme } from '../../../../constants/StyledComponentsTheme';

const MessageContainer = styled.View`
    min-height: 40px;
    height: auto;
    max-width: 80%;
    justify-content: center;
    border-radius: ${props => props.theme.$bigBorderRadius}px;
`;

const MessageText = styled.Text`
    font-size: 15px;
    margin-left: 10px;
`;

const MessageTex2t = styled.Text`
    font-size: 15px;
    margin-left: 10px;
`;

export default function MessageItem({ messageItem, userId }) {

    const { message, userId_1, userId_2 } = messageItem;
    const { $myChatMessageColor, $notMyChatMessageColor } = theme;

    const customBalloonStyle = {
        backgroundColor: userId_1 == userId ? $myChatMessageColor : $notMyChatMessageColor
    };

    return <MessageContainer style={customBalloonStyle}>
        <MessageText>{message}</MessageText>
    </MessageContainer>
    // return <div key={index} className={Styles.messageBalloonDiv}>

    //     <div className={Classes({
    //         [Styles.messageBalloon]: true,
    //         [Styles.messageBalloonRight]: item.userId_1 == userData.id,
    //         [Styles.messageBalloonLeft]: item.userId_1 != userData.id
    //     })}>

    //         <label className={Styles.messageBalloonTextLabel}>{item.message}</label>

    //         <label style={{ color: item.userId_1 != userData.id && 'var(--lightTextColor)' }}
    //             className={Styles.messageBalloonTimeLabel}>{item.hourMinute}
    //         </label>
    //     </div>
    // </div>
}
