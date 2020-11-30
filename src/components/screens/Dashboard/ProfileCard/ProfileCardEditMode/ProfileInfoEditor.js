import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from '../../../../../actions';
import * as Options from '../../../../utils/Options';
import { TextArea, InputWithIconButton, DropDownSelector, DatePicker } from '../../../../utils/StatelessComponents';
import Styles from './ProfileCardEditMode.module.css';

export default () => {

    const dispatch = useDispatch();

    const { userData } = useSelector(state => state.dashboard);

    const [about, setAbout] = useState(userData.about);
    const [company, setCompany] = useState(userData.company);
    const [position, setPosition] = useState(userData.position);
    const [schooling, setSchooling] = useState(userData.schooling);
    const [gender, setGender] = useState(userData.gender);
    const [birthday, setBirthday] = useState(userData.birthday);

    const changeAbout = (value) => setAbout(value.target.value);
    const changeCompany = (value) => setCompany(value.target.value);
    const changePosition = (value) => setPosition(value.target.value);
    const changeSchooling = (value) => setSchooling(value);
    const changeGender = (value) => setGender(value);
    const changeBirthdayPicker = (date) => setBirthday(date);

    useEffect(() => {
        if (about !== userData.about)
            dispatch(Actions.updateUserDataOnRedux({ ...userData, about }));
    }, [about]);

    useEffect(() => {
        if (company !== userData.company)
            dispatch(Actions.updateUserDataOnRedux({ ...userData, company }));
    }, [company]);

    useEffect(() => {
        if (position !== userData.position)
            dispatch(Actions.updateUserDataOnRedux({ ...userData, position }));
    }, [position]);

    useEffect(() => {
        if (schooling !== userData.schooling)
            dispatch(Actions.updateUserDataOnRedux({ ...userData, schooling }));
    }, [schooling]);

    useEffect(() => {
        if (gender !== userData.gender)
            dispatch(Actions.updateUserDataOnRedux({ ...userData, gender }));
    }, [gender]);

    useEffect(() => {
        if (birthday !== userData.birthday)
            dispatch(Actions.updateUserDataOnRedux({ ...userData, birthday }));
    }, [birthday]);

    useEffect(() => {
        if (userData.about !== about)
            setAbout(userData.about);
        if (userData.company !== company)
            setCompany(userData.company);
        if (userData.position !== position)
            setPosition(userData.position);
        if (userData.schooling !== schooling)
            setSchooling(userData.schooling);
        if (userData.gender !== gender)
            setGender(userData.gender);
        if (userData.birthday !== birthday)
            setBirthday(userData.birthday);
    }, [userData]);

    return (
        <div className={Styles.profileInfoEditor}>
            <h3 className="h3">{`Sobre ${userData.firstName} ${userData.lastName}`}</h3>

            <TextArea
                name={"about"}
                placeholder={"Escreva algo sobre você"}
                required={false}
                value={about}
                onChange={changeAbout}
            />

            <h3 className="h3">Data de nascimento</h3>
            <DatePicker
                selectedDate={birthday}
                handleDatePickerChange={changeBirthdayPicker}
                placeholder="Data de nascimento (+18)"
            />

            <h3 className="h3">Meu gênero</h3>
            <DropDownSelector
                options={Options.genderOptions()}
                value={gender}
                placeholder={"Meu gênero"}
                onChange={changeGender}
            />

            <h3 className="h3">Minha escolaridade</h3>
            <DropDownSelector
                options={Options.schoolingOptions()}
                value={schooling}
                placeholder={"Escolaridade"}
                onChange={changeSchooling}
            />

            <h3 className="h3">Empresa onde trabalho</h3>
            <InputWithIconButton
                type={"text"}
                name={"company"}
                placeholder={"Empresa onde trabalha"}
                required={false}
                value={company}
                onChange={changeCompany}
                showRightButton={false}
            />

            <h3 className="h3">Cargo</h3>
            <InputWithIconButton
                type={"text"}
                name={"position"}
                placeholder={"Cargo"}
                required={false}
                value={position}
                onChange={changePosition}
                showRightButton={false}
            />
        </div>
    )
}
