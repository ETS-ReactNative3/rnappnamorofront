import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../constants/StyledComponentsTheme';
import styled from 'styled-components';

const Button = styled.TouchableHighlight`
    height: ${props => props.theme.$heightOfGenericComponents}px;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: ${props => props.theme.$bigBorderRadius};
    background-color: orange;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
`;

const Gradient = styled(LinearGradient)`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: ${props => props.theme.$bigBorderRadius};
`;

export default GenericAppButton = (props) => {
    return <Button style={props.customButtonStyle} underlayColor={props.underlayColor} onPress={() => props.onPress()}>
        <Gradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[theme.$degradeColor_1, theme.$degradeColor_2]}>
            <ButtonText>{props.textButton}</ButtonText>
        </Gradient>
    </Button>
}
