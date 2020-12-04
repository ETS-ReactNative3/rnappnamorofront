import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { GenericRowView } from '../../GlobalStyle';

const LineTextLineContainer = styled(GenericRowView)`
    width: auto;
    align-items: center;
`;

const Line = styled.View`
    display: flex;
    width: 40%;
    margin-top: 4px;
    border-bottom-width: 1px;
    border-color: ${props => props.theme.$lightTextColor};
`;

export default LineTextLine = (props) => {
    return <LineTextLineContainer>
        <Line />
        <Text style={{ padding: 5 }}>{props.text}</Text>
        <Line />
    </LineTextLineContainer>
}
