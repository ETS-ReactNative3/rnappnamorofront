import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-native-looped-carousel';
import { Dimensions } from 'react-native';

import { generateRandomKey } from '../../../../../utils/Functions';
import { H2, GenericColumnView } from '../../../../../../GlobalStyle';
import noProfile from '../../../../../../assets/noProfile.png';

const ProfileCardInfo = styled(GenericColumnView)`
    flex: 1;
    width: ${Dimensions.get('window').width - 20}px;
    justify-content: center;
    align-items: center;
    background-color: white;
    elevation: 5;
    border-radius: ${props => props.theme.$bigBorderRadius}px;
`;

const H2Custom = styled(H2)`
    text-align: center;
    margin-bottom: 10px;
`;

const UserImage = styled.Image`
    flex: 1;
    height: 100%;
    border-radius: ${props => props.theme.$bigBorderRadius}px;
    resize-mode: cover;
`;

export default function ProfileCard({ userImages }) {

    const arrowStyle = {
        color: 'white',
        fontSize: 22,
        margin: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    };

    return <ProfileCardInfo>
        <Carousel
            style={{ width: '100%', height: '100%' }}
            leftArrowText={'＜'}
            leftArrowStyle={arrowStyle}
            rightArrowText={'＞'}
            rightArrowStyle={arrowStyle}
            pageInfoBottomContainerStyle={{ height: 20, position: 'absolute', top: 10, }}
            pageInfo
            arrows
            swipe={false}

            arrowStyle={{ height: '100%', justifyContent: 'center' }}

            pageInfoTextStyle={{ color: 'white' }}

            isLooped={false}
            autoplay={false}
        >
            {
                userImages?.length > 0 ?
                    userImages.map(image => <UserImage key={generateRandomKey()} source={{ uri: image.imageUrl }} />)
                    :
                    <UserImage source={noProfile} />
            }
        </Carousel>
    </ProfileCardInfo>
}
