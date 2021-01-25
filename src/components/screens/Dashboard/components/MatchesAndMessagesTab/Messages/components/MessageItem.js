import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../../../../../../constants/StyledComponentsTheme';
import { GenericColumnView, GenericRowView, P } from '../../../../../../../GlobalStyle';
import noProfile from '../../../../../../../assets/noProfile.png';

const Button = styled.TouchableHighlight`
    height: 80px;
    width: 100%;
    border-top-width: 0.7px;
    border-top-color: ${props => props.theme.$lightGray};
`;

const MainContainer = styled(GenericRowView)`
    flex: 1;
    align-items: center;
`;

const TextContainer = styled(GenericColumnView)`
    padding-left: 10px;
    flex: 1;
`;

const Image = styled.Image`
    height: 65px;
    width: 65px;
    margin-left: 5px;
    border-radius: 80px;
`;

const PTitle = styled(P)`
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 5px;
`;

const PMessage = styled(P)`
    font-size: 15px;
`;

const PTime = styled(P)`
    font-size: 12px;
`;

const TimeContainer = styled.View`
    width: 35px;
    height: 100%;
    padding-bottom: 5px;
    justify-content: flex-end;
`;

export default function MessageItem({ messageItem }) {

    const navigation = useNavigation();

    const { userImages, firstName, lastName } = messageItem.matchProfile;
    const { hourMinute, message } = messageItem;

    const profileImage = userImages && userImages.length > 0 ? { uri: userImages[0].imageUrl } : noProfile;

    const openChatScreen = () => {
        navigation.push('ChatModal', { profileImage, matchProfile: messageItem.matchProfile });
    }

    return <Button underlayColor={theme.$lightGray} onPress={openChatScreen}>
        <MainContainer>

            <Image source={profileImage} />

            <TextContainer>
                <PTitle>{`${firstName} ${lastName}`}</PTitle>
                <PMessage>{message}</PMessage>
            </TextContainer>

            <TimeContainer>
                <PTime>{hourMinute}</PTime>
            </TimeContainer>

        </MainContainer>
    </Button>
}
