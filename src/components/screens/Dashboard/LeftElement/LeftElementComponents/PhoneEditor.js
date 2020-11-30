import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    ProfileGenericButton,
    SubtitleLeftElement,
    InputWithIconButton
} from '../../../../utils/StatelessComponents';
import * as Actions from '../../../../../actions';
import Styles from './LeftElementComponents.module.css';

export default () => {

    const dispatch = useDispatch();

    const { userData } = useSelector(state => state.dashboard);

    const [phone, setPhone] = useState(userData.phone);
    const [isSendButtonEnable, setIsSendButtonEnable] = useState(phone !== userData.phone ? true : false);

    const changePhone = (value) => setPhone(value.target.value);

    useEffect((() => {
        setIsSendButtonEnable(phone !== userData.phone ? true : false);
    }), [phone]);

    const updateUserPhone = async (event) => {

        event.preventDefault();

        if (phone !== userData.phone) {
            dispatch(Actions.updateUser({ phone }));
        }
    }

    return (
        <form onSubmit={updateUserPhone}>
            <div className={Styles.container}>

                <SubtitleLeftElement title="CONFIGURAÇÕES DA CONTA" />

                <InputWithIconButton
                    type={"phone"}
                    name={"phone"}
                    placeholder={"Nº do telefone"}
                    value={phone}
                    required={false}
                    onChange={changePhone}
                    showRightButton={false}
                />

                <ProfileGenericButton
                    enable={isSendButtonEnable}
                    type="submit"
                    buttonText="Atualizar telefone"
                />
            </div>
        </form>
    )
}
