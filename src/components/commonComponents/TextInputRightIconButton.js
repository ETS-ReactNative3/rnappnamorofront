import React from 'react';
import styled from 'styled-components/native';

import { GenericRowView } from '../../GlobalStyle';
import { AwesomeIcon } from '../commonComponents';

const MainView = styled(GenericRowView)`
    height: ${props => props.theme.$heightOfGenericComponents}px;
    width: 100%;
    margin-top: 10px;
    background-color: ${props => props.theme.$lightGray};
    border-radius: ${props => props.theme.$smallBorderRadius};
    padding: 3px;
    align-items: center;
`;

const Input = styled.TextInput`
    flex: 1;
    height: ${props => props.theme.$heightOfGenericComponents}px;
    background-color: white;
    border-width: 1px;
    border-color: ${props => props.theme.$lightGray};
    border-radius: ${props => props.theme.$smallBorderRadius};
    padding-left: 10px;
    color: ${props => props.theme.$defaultTextColor};
`;

const Button = styled.TouchableHighlight`
    height: 100%;
    width: ${props => props.theme.$heightOfGenericComponents}px;
    justify-content: center;
    background-color: ${props => props.theme.$lightGray};
    border-top-right-radius: ${props => props.theme.$smallBorderRadius};
    border-bottom-right-radius: ${props => props.theme.$smallBorderRadius};
`;

export default TextInputRightIconButton = (props) => {
    return <MainView>
        <Input type={props.type !== 'password' ? props.type : hidePassword ? props.type : 'text'}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            returnKeyType={props.returnKeyType}
            onSubmitEditing={props.onSubmitEditing}
            ref={props.reference}
        />

        {
            props.showRightButton &&
            <Button style={props.customButtonStyle} underlayColor={props.underlayColor} onPress={() => props.onButtonPress()}>
                <AwesomeIcon {...props} />
            </Button>
        }
    </MainView >
}
