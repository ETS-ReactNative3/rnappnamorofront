import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import * as Actions from '../../../../actions';
import { theme } from '../../../../constants/StyledComponentsTheme';
import { handleError } from '../../../utils/Functions';
import { dangerNotification } from '../../../utils/Notifications';
import { GenericColumnView } from '../../../../GlobalStyle';
import * as Options from '../../../utils/Options';
import {
    TextInputRightIconButton,
    DatePickerButton,
    ModalSelector,
    MultiSlider,
    GenericAppButton
} from '../../../commonComponents';

export default function LoginCard() {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);
    const [searchingBy, setSearchingBy] = useState(null);
    const [ageRange, setAgeRange] = useState([22, 35]);
    const [maxDistance, setMaxDistance] = useState([80]);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
    const [passwordConfirmationSecureTextEntry, setPasswordConfirmationSecureTextEntry] = useState(true);

    const tiLastName = useRef();
    const tiEmail = useRef();
    const tiPhone = useRef();
    const tiPassword = useRef();
    const tiPasswordConfirmation = useRef();

    const createNewAccount = async () => {
        try {
            if (password === passwordConfirmation) {

                if (firstName !== '' && lastName !== '' && email !== '' && birthday && gender && searchingBy) {
                    const userData = ({
                        firstName,
                        lastName,
                        email,
                        phone,
                        birthday,
                        gender: gender.key,
                        searchingBy: searchingBy.key,
                        ageRange: ageRange[0] + ',' + ageRange[1],
                        maxDistance,
                        password,

                        //some default values:
                        method: 'local',
                        showMeOnApp: 1,
                        verifiedEmail: 0,
                        emailNotification: 1,
                        pushNotification: 1
                    });

                    dispatch(Actions.signUpAction(userData));
                }
                else {
                    dangerNotification('Preencha todos os campos antes de continuar.');
                }
            }
            else {
                dangerNotification('As senhas devem ser iguais.');
            }
        } catch (err) {
            handleError(err);
        }
    }

    return <GenericColumnView>

        <TextInputRightIconButton
            placeholder={'Nome'}
            value={firstName}
            returnKeyType={'next'}
            onChangeText={(value) => setFirstName(value)}
            onSubmitEditing={() => tiLastName.current.focus()}
        />

        <TextInputRightIconButton
            reference={tiLastName}
            placeholder={'Sobrenome'}
            value={lastName}
            returnKeyType={'next'}
            onChangeText={(value) => setLastName(value)}
            onSubmitEditing={() => tiEmail.current.focus()}
        />

        <TextInputRightIconButton
            reference={tiEmail}
            placeholder={'Email'}
            keyboardType={'email-address'}
            value={email}
            returnKeyType={'next'}
            onChangeText={(value) => setEmail(value)}
            onSubmitEditing={() => tiPhone.current.focus()}
        />

        <TextInputRightIconButton
            reference={tiPhone}
            placeholder={'Telefone'}
            keyboardType={'phone-pad'}
            value={phone}
            returnKeyType={'next'}
            onChangeText={(value) => setPhone(value)}
        />

        <DatePickerButton
            selectedDate={birthday}
            updateSelectedDate={(selectedDate) => setBirthday(selectedDate)}
        />

        <ModalSelector
            title={'Meu gênero'}
            data={Options.genderOptions()}
            selectedItem={gender}
            handleChange={(selectedItem) => setGender(selectedItem)}
        />

        <ModalSelector
            title={'Procuro por'}
            data={Options.searchingByOptions()}
            selectedItem={searchingBy}
            handleChange={(selectedItem) => setSearchingBy(selectedItem)}
        />

        <MultiSlider
            title={'Faixa etária'}
            values={ageRange}
            onValuesChange={(value) => setAgeRange([value[0], value[1]])}
            min={18}
            max={55}
        />

        <MultiSlider
            title={'Distância máxima'}
            values={maxDistance}
            rightText={'km'}
            onValuesChange={(value) => setMaxDistance(value)}
            min={2}
            max={500}
        />

        <TextInputRightIconButton
            reference={tiPassword}
            placeholder={'Senha'}
            showRightButton
            solidIcon
            returnKeyType={'next'}
            value={password}
            onChangeText={(value) => setPassword(value)}
            customIconStyle={{ color: theme.$gray }}
            iconName={passwordSecureTextEntry ? 'eye' : 'eye-slash'}
            secureTextEntry={passwordSecureTextEntry}
            underlayColor={theme.$darkGray}
            onButtonPress={() => setPasswordSecureTextEntry(!passwordSecureTextEntry)}
            onSubmitEditing={() => tiPasswordConfirmation.current.focus()}
        />

        <TextInputRightIconButton
            reference={tiPasswordConfirmation}
            placeholder={'Repetir senha'}
            showRightButton
            solidIcon
            value={passwordConfirmation}
            onChangeText={(value) => setPasswordConfirmation(value)}
            customIconStyle={{ color: theme.$gray }}
            iconName={passwordConfirmationSecureTextEntry ? 'eye' : 'eye-slash'}
            secureTextEntry={passwordConfirmationSecureTextEntry}
            underlayColor={theme.$darkGray}
            onButtonPress={() => setPasswordConfirmationSecureTextEntry(!passwordConfirmationSecureTextEntry)}
        />

        <GenericAppButton
            customButtonStyle={{ margin: 30, width: 'auto' }}
            textButton={'ENVIAR'}
            onPress={() => createNewAccount()}
        />

    </GenericColumnView>
}
