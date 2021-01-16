import React from 'react';
import styled from 'styled-components/native';

import AwesomeIcon from '../commonComponents/AwesomeIcon';
import { GenericColumnView, H2 } from '../../GlobalStyle';
import { theme } from '../../constants/StyledComponentsTheme';

const MainContainer = styled(GenericColumnView)`
    flex: 1; 
    justify-content: center;
`;

const ModalContainer = styled(GenericColumnView)`
    margin: 10px;
    width: auto;
    background-color: white;
    border-radius: ${props => props.theme.$mediumBorderRadius}px;
`;

const Button = styled.TouchableHighlight`
    height: ${props => props.theme.$heightOfGenericComponent}px;
    width: ${props => props.theme.$heightOfGenericComponent}px;
    justify-content: center;
    background-color: white;
    border-radius: ${props => props.theme.$mediumBorderRadius}px;
    align-self: flex-end;
`;

const H2Custom = styled(H2)`
    margin-bottom: 20px;
    text-align: center;
`;

const ScrollViewCustom = styled.ScrollView`
    border-radius: ${props => props.theme.$mediumBorderRadius}px;
    background-color: transparent;
    padding: 10px;
`;

export default GenericModalContainer = ({ title, children, closeButtonPress }) => {
    return <MainContainer>
        <ModalContainer>
            <ScrollViewCustom>

                <Button underlayColor={theme.$lightGray} onPress={closeButtonPress}>
                    <AwesomeIcon iconName={'times'} solid />
                </Button>

                <H2Custom>{title}</H2Custom>

                {children}

            </ScrollViewCustom>
        </ModalContainer>
    </MainContainer>
}
