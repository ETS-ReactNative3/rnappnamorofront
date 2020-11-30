import React, { useState } from "react";
import Classes from 'classnames';
import { useHistory } from "react-router-dom";

import * as Actions from '../../../actions';
import Api from '../../utils/Api';
import Styles from './PasswordReset.module.css';
import { successNotification, dangerNotification } from '../../utils/Notifications';
import { handleError } from '../../utils/Functions';
import { useDispatch } from "react-redux";
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
            dispatch(Actions.showLoader(true));

            let email = props.match.params.email;
            let token = props.match.params.token;

            const accessToken = localStorage.getItem('accessToken');
            const res = await Api({ accessToken }).post('account/passwordreset', { email, token, password, passwordConfirmation });

            dispatch(Actions.showLoader(false));

            if (res.data == 'Senha atualizada com sucesso!') {

                successNotification(res.data);
                history.push("/");
            }
            else
                dangerNotification(res.data);

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
