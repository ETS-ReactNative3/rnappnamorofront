import React, { useState } from "react";
import Classes from 'classnames';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as Actions from '../../../actions';
import Styles from './PasswordReset.module.css';
import { successNotification, dangerNotification } from '../../utils/Notifications';
import { handleError } from '../../utils/Functions';
import { Separator, InputWithIconButton, GenericBottomButton } from '../../utils/StatelessComponents';
import logo from '../../../assets/logo.png';

export default (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const changePassword = (value) => setPassword(value.target.value);
    const changePasswordConfirmation = (value) => setPasswordConfirmation(value.target.value);

    const handlePasswordReset = async (event) => {

        try {
            event.preventDefault();

            const { email, token } = props.match.params;

            dispatch(Actions.resetPassword(email, token, password, passwordConfirmation))
                .then((res) =>
                    res.data == 'Senha atualizada com sucesso!' ? (

                        successNotification(res.data),
                        history.push("/")

                    ) : dangerNotification(res.data)
                );

        } catch (err) {

            dispatch(Actions.showLoader(false));
            handleError(err);
        }
    }

    return (
        <div className="container">

            <img src={logo} onClick={() => history.push('/')} className="bigLogo" />

            <form
                className={Classes({ [Styles.form]: true, "form": true })}
                onSubmit={handlePasswordReset}>

                <div className="fullWidthComponent">
                    <h1 className="h1">Digite sua nova senha</h1>

                    <Separator text={null} />

                    <InputWithIconButton
                        type={"password"}
                        name={"password"}
                        placeholder={"Senha"}
                        required
                        value={password}
                        onChange={changePassword}
                        showRightButton
                        iconName={"fa fa-eye"}
                    />

                    <InputWithIconButton
                        type={"password"}
                        name={"passwordConfirmation"}
                        placeholder={"Confirmar senha"}
                        required
                        value={passwordConfirmation}
                        onChange={changePasswordConfirmation}
                        showRightButton
                        iconName={"fa fa-eye"}
                    />

                    <GenericBottomButton
                        type="submit"
                        onClick={() => null}
                        buttonText={'Enviar'}
                    />
                </div>
            </form>
        </div >
    );
}
