import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Classes from 'classnames';

import * as Actions from '../../../actions';
import {
    Separator,
    DatePicker,
    DropDownSelector,
    InputWithIconButton,
    GenericDoubleBottomButton
} from '../../utils/StatelessComponents';
import { handleError, convertDateFormatToDDMMYYYY } from '../../utils/Functions';
import { dangerNotification } from '../../utils/Notifications';
import { Scrollbars } from 'react-custom-scrollbars';
import * as Options from '../../utils/Options';
import Styles from './CompleteYourProfile.module.css';

export default () => {

    Modal.setAppElement('#root');

    const dispatch = useDispatch();

    const { isCompleteYourProfileModalOpen } = useSelector(state => state.modal);
    const { showLoader } = useSelector(state => state.utils);
    const { userData } = useSelector(state => state.dashboard);

    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState(userData.gender);
    const [searchingBy, setSearchingBy] = useState(userData.searchingBy);
    const [phone, setPhone] = useState(userData.phone);
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [schooling, setSchooling] = useState(null);

    const changeBirthdayPicker = (date) => setBirthday(date);
    const changeGender = (value) => setGender(value);
    const changeSearchingBy = (value) => setSearchingBy(value);
    const changePhone = (value) => setPhone(value.target.value);
    const changeCompany = (value) => setCompany(value.target.value);
    const changePosition = (value) => setPosition(value.target.value);
    const changeSchooling = (value) => setSchooling(value);

    useEffect(() => {
        setGender(userData.gender);
        setSearchingBy(userData.searchingBy);
        setPhone(userData.phone);
        setBirthday(convertDateFormatToDDMMYYYY(userData.birthday) != convertDateFormatToDDMMYYYY(new Date()) ? userData.birthday : null);
    }, [userData]);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (birthday && gender && searchingBy && schooling) {

                const userData = ({
                    birthday,
                    gender: gender.key,
                    searchingBy: searchingBy.key,
                    schooling: schooling.key,
                    phone,
                    company,
                    position,
                    profileComplete: 1
                });

                dispatch(Actions.updateUser(userData));
            }
            else {
                dangerNotification('"Dt. de nascimento", "Gênero", "Procuro por" e "Escolaridade" são campos obrigatórios.');
            }
        } catch (err) {
            handleError(err);
        }
    }

    const modalStyle = {
        overlay: {
            backgroundColor: !showLoader && 'var(--opaqueBlackBackgroundColor)',
        }
    }

    const profileFields = () => {
        return <>
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

            <DropDownSelector
                options={Options.schoolingOptions()}
                value={schooling}
                placeholder={"Escolaridade"}
                onChange={changeSchooling}
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

            <InputWithIconButton
                type={"text"}
                name={"company"}
                placeholder={"Empresa onde trabalha"}
                required={false}
                value={company}
                onChange={changeCompany}
                showRightButton={false}
            />

            <InputWithIconButton
                type={"text"}
                name={"position"}
                placeholder={"Cargo"}
                required={false}
                value={position}
                onChange={changePosition}
                showRightButton={false}
            />
        </>
    }

    return (
        <Scrollbars autoHide>
            <Modal
                isOpen={isCompleteYourProfileModalOpen}
                onRequestClose={null}
                style={modalStyle}
                className={Classes({ [Styles.modal]: true, "modal": true })}
            >
                <form
                    className={Classes({ [Styles.form]: true, "form": true })}
                    onSubmit={handleSubmit}
                    style={{ backgroundColor: 'white' }}>

                    <h1 className="h1">Vamos completar seu perfil!</h1>

                    <Separator text={null} />

                    {profileFields()}

                    <GenericDoubleBottomButton
                        button1Type={'button'}
                        button2Type={'submit'}
                        button1Click={() => dispatch(Actions.signOut())}
                        button2Click={() => null}
                        button1Text={'SAIR'}
                        button2Text={'CONTINUAR'}
                    />
                </form>
            </Modal>
        </Scrollbars>
    );
}
