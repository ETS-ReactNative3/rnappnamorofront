import React, { useState } from 'react';
import styled from 'styled-components/native';
import DateTimePicker from "react-native-modal-datetime-picker"

import { theme } from '../../constants/StyledComponentsTheme';
import { convertDateFormatToDDMMYYYY } from '../utils/Functions';
import { GenericRowView, P } from '../../GlobalStyle';

const MainContainer = styled(GenericRowView)`
    height: ${props => props.theme.$heightOfGenericComponents}px;
    width: 100%;
    margin-top: 10px;
    background-color: ${props => props.theme.$lightGray};
    border-radius: ${props => props.theme.$smallBorderRadius};
    padding: 1px 4px;
    align-items: center;
    justify-content: center;
`;

const Button = styled.TouchableHighlight`
    height: 100%;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    background-color: white;
    border-top-right-radius: ${props => props.theme.$smallBorderRadius};
    border-bottom-right-radius: ${props => props.theme.$smallBorderRadius};
    padding-left: 9px;
`;

export default TextInputRightIconButton = (props) => {

    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

    const handleDatePicked = (selectedDate) => {
        setIsDateTimePickerVisible(false);
        props.updateSelectedDate(convertDateFormatToDDMMYYYY(selectedDate));
    }

    const { selectedDate } = props;

    return <MainContainer>

        {/* DateTimePicker is the dialog that the user interacts with */}
        <DateTimePicker
            minimumDate={new Date('01-01-1900')}
            maximumDate={new Date(new Date().getFullYear() - 18 + '-' + new Date().getMonth() + '-' + new Date().getDate())}
            isVisible={isDateTimePickerVisible}
            onConfirm={(date) => handleDatePicked(date)}
            onCancel={() => setIsDateTimePickerVisible(false)}
        />

        <Button underlayColor={theme.$lightGray} onPress={() => setIsDateTimePickerVisible(true)}>

            <P>{selectedDate ? selectedDate : 'Data de nascimento (+18)'}</P>

        </Button >
    </MainContainer >
}
