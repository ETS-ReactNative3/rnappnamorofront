import React from 'react';
import styled from 'styled-components';

import { P, H2 } from '../../../../../../GlobalStyle';
import { GenericColumnView } from '../../../../../../GlobalStyle';

const MainContainer = styled(GenericColumnView)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const H2Custom = styled(H2)`
    text-align: center;
    margin-bottom: 10px;
`;

export default function ProfileCard({ profile }) {
    return <MainContainer>
        <H2Custom>id: {profile.id}</H2Custom>
        <H2Custom>idade: {profile.age}</H2Custom>
        <H2Custom>{profile.firstName}</H2Custom>
        <H2Custom>{profile.lastName}</H2Custom>
    </MainContainer>
}
