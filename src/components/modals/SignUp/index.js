import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Classes from 'classnames';

import * as Actions from '../../../actions';
import {
    FormCloseButton,
    Separator,
    DatePicker,
    DropDownSelector,
    SliderRangeSelector,
    SliderSelector,
    InputWithIconButton,
    GenericBottomButton
} from '../../utils/StatelessComponents';
import * as Options from '../../utils/Options';
import { handleError } from '../../utils/Functions';
import { dangerNotification } from '../../utils/Notifications';
import { Scrollbars } from 'react-custom-scrollbars';
import Styles from './SignUp.module.css';

export default () => {

    Modal.setAppElement('#root');

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);
    const [searchingBy, setSearchingBy] = useState(null);
    const [ageRange, setAgeRange] = useState(['22', '35']);
    const [maxDistance, setMaxDistance] = useState(80);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const changeFirstName = (value) => setFirstName(value.target.value);
    const changeLastName = (value) => setLastName(value.target.value);
    const changeEmail = (value) => setEmail(value.target.value);
    const changePhone = (value) => setPhone(value.target.value);
    const changeBirthdayPicker = (date) => setBirthday(date);
    const changeGender = (value) => setGender(value);
    const changeSearchingBy = (value) => setSearchingBy(value);
    const changeMaxDistance = (value) => setMaxDistance(value);
    const changeAgeRange = (value) => setAgeRange([value[0], value[1]]);
    const changePassword = (value) => setPassword(value.target.value);
    const changePasswordConfirmation = (value) => setPasswordConfirmation(value.target.value);

    const { isSignUpModalOpen } = useSelector(state => state.modal);
    const { showLoader } = useSelector(state => state.utils);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (password === passwordConfirmation) {

                if (birthday && gender && searchingBy) {
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
                    dangerNotification('"Data de nascimento", "Gênero" e "Procuro por" são campos obrigatórios.');
                }
            }
            else {
                dangerNotification('As senhas devem ser iguais.');
            }
        } catch (err) {
            handleError(err);
        }
    }

    const handleClose = () => dispatch(Actions.showSignUpModal(false));

    const modalStyle = {
        overlay: {
            backgroundColor: !showLoader && 'var(--opaqueBackgroundColor)',
        }
    }

    const signUpFields = () => {
        return <>
            <InputWithIconButton
                type={"text"}
                name={"firstName"}
                placeholder={"Nome"}
                required={true}
                value={firstName}
                onChange={changeFirstName}
                showRightButton={false}
            />

            <InputWithIconButton
                type={"text"}
                name={"lastName"}
                placeholder={"Sobrenome"}
                required={true}
                value={lastName}
                onChange={changeLastName}
                showRightButton={false}
            />

            <InputWithIconButton
                type={"email"}
                name={"email"}
                placeholder={"E-mail"}
                required={true}
                value={email}
                onChange={changeEmail}
                showRightButton={false}
            />

            <InputWithIconButton
                type={"phone"}
                name={"phone"}
                placeholder={"Telefone"}
                required={false}
                value={phone}
                onChange={changePhone}
                showRightButton={false}
            />

            <DatePicker
                selectedDate={birthday}
                handleDatePickerChange={changeBirthdayPicker}
                placeholder="Data de nascimento (+18)"
            />

            <DropDownSelector
                options={Options.genderOptions()}
                value={gender}
                placeholder={"Meu gênero"}
                onChange={changeGender}
            />

            <DropDownSelector
                options={Options.searchingByOptions()}
                value={searchingBy}
                placeholder={"Procuro por"}
                onChange={changeSearchingBy}
            />

            <SliderRangeSelector
                title="Faixa etária"
                value={ageRange}
                onChange={changeAgeRange}
            />

            <SliderSelector
                title="Distância máxima"
                value={maxDistance}
                onChange={changeMaxDistance}
            />

            <InputWithIconButton
                type={"password"}
                name={"password"}
                placeholder={"Senha"}
                required={true}
                value={password}
                onChange={changePassword}
                showRightButton={true}
                iconName={"fa fa-eye"}
            />

            <InputWithIconButton
                type={"password"}
                name={"passwordConfirmation"}
                placeholder={"Confirmar senha"}
                required={true}
                value={passwordConfirmation}
                onChange={changePasswordConfirmation}
                showRightButton={true}
                iconName={"fa fa-eye"}
            />
        </>
    }

    return (
        <Modal
            isOpen={isSignUpModalOpen}
            onRequestClose={handleClose}
            style={modalStyle}
            className={Classes({ [Styles.modal]: true, "modal": true })}
        >
            <Scrollbars autoHide>
                <form
                    className={Classes({ [Styles.form]: true, "form": true })}
                    onSubmit={handleSubmit}
                    style={{ backgroundColor: 'white' }}>

                    <FormCloseButton handleClose={handleClose} />

                    <h1 className="h1">Nova Conta</h1>

                    <Separator text={null} />

                    {signUpFields()}

                    <GenericBottomButton
                        buttonType={'submit'}
                        onClick={() => null}
                        buttonText={'Criar conta'}
                    />
                </form>
            </Scrollbars>
        </Modal>
    );
}
