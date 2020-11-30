import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { GenericRowView, AwesomeIcon } from '../../GlobalStyle';

const Button = styled.TouchableHighlight`
    height: ${props => props.theme.$heightOfGenericComponents}px;
    width: 100%;
    justify-content: center;
    border-radius: ${props => props.theme.$smallBorderRadius};
    margin-top: 10px;
`;

const IconView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${props => props.theme.$heightOfGenericComponents + 10}px;
    height: ${props => props.theme.$heightOfGenericComponents}px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
`;

export default SocialButton = (props) => {
    return <Button style={props.customButtonStyle} underlayColor={props.underlayColor} onPress={() => props.onPress()}>
        <GenericRowView>

            <IconView>
                <AwesomeIcon name={props.iconName} style={{ color: 'white' }} />
            </IconView>

            <ButtonText style={{ color: 'white' }}>Entrar com <Text style={{ fontWeight: 'bold' }}>{props.text}</Text></ButtonText>

        </GenericRowView>
    </Button>
}
