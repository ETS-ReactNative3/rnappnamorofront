import React from 'react';
import styled from 'styled-components/native';
import { GenericColumnView, P } from '../../GlobalStyle';

const Container = styled(GenericColumnView)`
    height: 50px;
    justify-content: flex-end;
    align-items: flex-start;
`;

const Title = styled(P)`
    margin: 0 0 3px 10px;
    color: ${props => props.theme.$lightTextColor};
`;

export default SectionTitle = ({ titleText }) => {
    return <Container>

        <Title>{titleText}</Title>

    </Container>
}
