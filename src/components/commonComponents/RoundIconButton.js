import React from 'react';
import styled from 'styled-components/native';

import AwesomeIcon from '../commonComponents/AwesomeIcon';

const Button = styled.TouchableHighlight`
    height: 60px;
    width: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background-color: ${props => props.theme.$primaryColor};
    elevation: 2;
`;

const IconContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${props => props.theme.$heightOfGenericComponent + 10}px;
    height: ${props => props.theme.$heightOfGenericComponent}px;
`;

export default RoundIconButton = (props) => {

    const { underlayColor, customButtonStyle } = props;

    return <Button onPress={props.onButtonPress} underlayColor={underlayColor} style={customButtonStyle}>

        <IconContainer>
            <AwesomeIcon {...props} customIconStyle={props.customIconStyle} />
        </IconContainer>

    </Button>
}
