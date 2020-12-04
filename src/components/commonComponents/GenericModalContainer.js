import React from 'react';
import styled from 'styled-components';

import { AwesomeIcon } from '../commonComponents';
import { GenericColumnView, H2 } from '../../GlobalStyle';
import { theme } from '../../constants/StyledComponentsTheme';

const ModalContainer = styled(GenericColumnView)`
    padding: 10px;
    height: auto;
    width: 100%;
    margin: 10px;
    border-radius: ${props => props.theme.$mediumBorderRadius};
    text-align: center;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    elevation: 10;
`;

const Button = styled.TouchableHighlight`
    height: ${props => props.theme.$heightOfGenericComponents}px;
    width: ${props => props.theme.$heightOfGenericComponents}px;
    justify-content: center;
    background-color: white;
    border-radius: ${props => props.theme.$mediumBorderRadius};
    align-self: flex-end;
`;

export default GenericModalContainer = (props) => {
    return <ModalContainer>

        <Button underlayColor={theme.$lightGray} onPress={() => props.onButtonPress()}>
            <AwesomeIcon iconName={'times'} solid />
        </Button>

        <H2>{props.title}</H2>

    </ModalContainer>
}
