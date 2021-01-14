import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

import { GenericContainer, P } from '../../../../../../../../GlobalStyle';
import noProfile from '../../../../../../../../assets/noProfile.png';

const UserPersonalInfoContainer = styled(GenericContainer)`
    height: auto;
`;

const UserImage = styled.Image`
    width: 150px;
    height: 150px;
    resize-mode: cover;
    border-radius: 300px;
    border-width: 3px;
    border-color: ${props => props.theme.$lightGray};
`;

const P1 = styled(P)`
    margin-top: 10px;
    font-size: 20px;
    color: black;
`;

const P2 = styled(P)`
    margin-top: 2px;
    font-size: 13px;
    color: ${props => props.theme.$gray};
`;

export default UserPersonalInfo = () => {

    const { userData } = useSelector(state => state.dashboard);

    return <UserPersonalInfoContainer>

        <UserImage
            source={
                userData.UserImages && userData.UserImages.length > 0 ?
                    { uri: userData.UserImages[0].imageUrl }
                    : noProfile
            }
        />

        <P1>{`${userData.firstName || ''} ${userData.lastName || ''}, ${userData.age || ''}`}</P1>

        <P2>{userData.position}</P2>

        <P2>{userData.schoolingDesc}</P2>

    </UserPersonalInfoContainer>
}
