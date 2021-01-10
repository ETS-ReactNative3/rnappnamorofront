import React from 'react';
import styled from 'styled-components/native';

import { GenericRowView } from '../../GlobalStyle';
import AwesomeIcon from '../commonComponents/AwesomeIcon';

const MainContainer = styled(GenericRowView)`
    height: ${props => props.theme.$heightOfGenericComponent}px;
    width: 100%;
    margin-top: 10px;
    background-color: ${props => props.theme.$lightGray};
    border-radius: ${props => props.theme.$smallBorderRadius}px;
    padding: 0.5px;
    align-items: center;
`;

const Input = styled.TextInput`
    flex: 1;
    margin-left: 3px;
    margin-right: 3px;
    height: 100%;
    background-color: white;
    border-width: 1px;
    border-color: ${props => props.theme.$lightGray};
    border-radius: ${props => props.theme.$smallBorderRadius}px;
    padding-left: 10px;
    color: ${props => props.theme.$defaultTextColor};
`;

const Button = styled.TouchableHighlight`
    height: 100%;
    width: ${props => props.theme.$heightOfGenericComponent}px;
    justify-content: center;
    background-color: ${props => props.theme.$lightGray};
    border-top-right-radius: ${props => props.theme.$smallBorderRadius}px;
    border-bottom-right-radius: ${props => props.theme.$smallBorderRadius}px;
`;

export default TextInputRightIconButton = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    returnKeyType,
    onSubmitEditing,
    keyboardType,
    reference,
    showRightButton,
    customButtonStyle,
    underlayColor,
    multiline,
    customContainerStyle,
    textAlignVertical,
    props
}) => {

    return <MainContainer style={customContainerStyle}>
        <Input
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            multiline={multiline}
            textAlignVertical={textAlignVertical}
            ref={reference}
        />

        {
            showRightButton &&
            <Button style={customButtonStyle} underlayColor={underlayColor} onPress={() => props.onButtonPress()}>
                <AwesomeIcon {...props} />
            </Button>
        }
    </MainContainer >
}
