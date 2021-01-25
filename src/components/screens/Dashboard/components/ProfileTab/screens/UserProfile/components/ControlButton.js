import React from 'react';
import styled from 'styled-components';

import { GenericColumnView, P } from '../../../../../../../../GlobalStyle';
import { RoundIconButton } from '../../../../../../../commonComponents';

const ButtonContainer = styled(GenericColumnView)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const PCustom = styled(P)`
    margin-top: 10px;
    font-size: 13px;
    color: black;
`;

export default function ControlButton(props) {
    return <ButtonContainer>

        <RoundIconButton {...props} />

        <PCustom>{props.buttonLabel}</PCustom>

    </ButtonContainer>
}
