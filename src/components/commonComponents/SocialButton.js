import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { GenericRowView } from '../../GlobalStyle';
import { AwesomeIcon } from '../commonComponents';

const ButtonContainer = styled(GenericRowView)`
    align-items: center;
`;

const Button = styled.TouchableHighlight`
    height: ${props => props.theme.$heightOfGenericComponents}px;
    width: 100%;
    justify-content: center;
    border-radius: ${props => props.theme.$smallBorderRadius};
    margin-top: 10px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
`;

const IconView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${props => props.theme.$heightOfGenericComponents + 10}px;
    height: ${props => props.theme.$heightOfGenericComponents}px;
`;

export default SocialButton = (props) => {
    return <Button style={props.customButtonStyle} underlayColor={props.underlayColor} onPress={() => props.onPress()}>
        <ButtonContainer>

            <IconView>
                <AwesomeIcon {...props} customIconStyle={{ color: 'white' }} />
            </IconView>

            <ButtonText>
                {'Entrar com '}
                <Text style={{ fontWeight: 'bold' }}>{props.text}</Text>
            </ButtonText>

        </ButtonContainer>
    </Button>
}
