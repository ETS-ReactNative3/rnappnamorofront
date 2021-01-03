import React from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

import AwesomeIcon from '../commonComponents/AwesomeIcon';
import { GenericColumnView, H2 } from '../../GlobalStyle';
import { theme } from '../../constants/StyledComponentsTheme';

const MainContainer = styled(GenericColumnView)`
    max-height: 100%;
    width: 100%;
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

const ScrollViewCustom = styled(ScrollView)`
    border-radius: ${props => props.theme.$mediumBorderRadius}px;
    background-color: transparent;
    padding: 10px;
`;

export default GenericModalContainer = (props) => {
    return <MainContainer>
        <ScrollViewCustom>

            <Button underlayColor={theme.$lightGray} onPress={() => props.navigation.goBack()}>
                <AwesomeIcon iconName={'times'} solid />
            </Button>

            <H2Custom>{props.title}</H2Custom>

            {props.children}

        </ScrollViewCustom>
    </MainContainer>
}
