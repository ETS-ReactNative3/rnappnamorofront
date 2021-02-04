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

const PCustom = styled(P)`
    font-size: 16px;
    text-align: center;
`;

const H2Custom = styled(H2)`
    text-align: center;
    margin-bottom: 10px;
`;

export default function MatchSearcherPlaceholder({ title, bodyText }) {
    return <MainContainer>
        <H2Custom>{title}</H2Custom>
        <PCustom>{bodyText}</PCustom>
    </MainContainer>
}
