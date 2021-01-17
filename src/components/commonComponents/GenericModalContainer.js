import React from 'react';
import styled from 'styled-components/native';

import { GenericColumnView, H2 } from '../../GlobalStyle';
import RoundCloseButton from './RoundCloseButton';

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

const H2Custom = styled(H2)`
    margin-bottom: 20px;
    text-align: center;
`;

const ScrollViewCustom = styled.ScrollView`
    background-color: transparent;
    padding: 10px;
`;

export default GenericModalContainer = ({ title, children, closeButtonPress }) => {
    return <MainContainer>
        <ModalContainer>
            <ScrollViewCustom>

                <RoundCloseButton onPress={closeButtonPress} />

                <H2Custom>{title}</H2Custom>

                {children}

            </ScrollViewCustom>
        </ModalContainer>
    </MainContainer>
}
