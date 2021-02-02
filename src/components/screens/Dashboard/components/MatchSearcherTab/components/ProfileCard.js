import React from 'react';
import styled from 'styled-components';

import { H2, GenericColumnView } from '../../../../../../GlobalStyle';

const MainContainer = styled(GenericColumnView)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: lightblue;
`;

const H2Custom = styled(H2)`
    text-align: center;
    margin-bottom: 10px;
`;

export default function ProfileCard({ currentProfile }) {

    const { id, age, firstName, lastName } = currentProfile || {};

    return <MainContainer>
        <H2Custom>id: {id}</H2Custom>
        <H2Custom>idade: {age}</H2Custom>
        <H2Custom>{firstName}</H2Custom>
        <H2Custom>{lastName}</H2Custom>
    </MainContainer>
}
