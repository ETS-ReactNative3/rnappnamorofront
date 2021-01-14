import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';

import { theme } from '../../constants/StyledComponentsTheme';

const Button = styled.TouchableHighlight`
    height: ${props => props.theme.$heightOfGenericComponent}px;
    width: 100%;
    max-width: 350px;
    justify-content: center;
    align-items: center;
    border-radius: ${props => props.theme.$bigBorderRadius}px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
`;

const Gradient = styled(LinearGradient)`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: ${props => props.theme.$bigBorderRadius}px;
`;

export default GenericAppButton = (props) => {

    const { customButtonStyle, underlayColor, onPress, textButton } = props;

    return <Button style={customButtonStyle} underlayColor={underlayColor} onPress={onPress}>
        {
            !customButtonStyle.backgroundColor ?
                <Gradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[theme.$degradeColor_1, theme.$degradeColor_2]}>
                    <ButtonText>{textButton}</ButtonText>
                </Gradient>
                :
                <ButtonText>{textButton}</ButtonText>
        }
    </Button>
}
