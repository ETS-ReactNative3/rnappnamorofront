import React, { useState, useEffect } from "react";
import Classes from 'classnames';
import { useHistory } from "react-router-dom";

import * as Actions from '../../../actions';
import Api from '../../utils/Api';
import Styles from './EmailVerification.module.css';
import { handleError } from '../../utils/Functions';
import { useDispatch } from "react-redux";
import { Separator, GenericBottomButton } from '../../utils/StatelessComponents';
import logo from '../../../assets/logo.png';

export default (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [succesfullyVerified, setSuccessfullyVerified] = useState('2');

    useEffect(() => {
        verifyEmail();
    }, [])

    const verifyEmail = async () => {
        try {

            dispatch(Actions.showLoader(true));

            let id = props.match.params.id;
            let token = props.match.params.token;
            let email = props.match.params.email;

            const accessToken = localStorage.getItem('accessToken');
            await Api({ accessToken }).post('account/update_verified_email', { email, token, id });

            setSuccessfullyVerified('1');
            dispatch(Actions.showLoader(false));

        } catch (err) {

            setSuccessfullyVerified('0');
            dispatch(Actions.showLoader(false));
            handleError(err);
        }
    }

    const navToHome = () => {
        history.push("/");
    }

    const pickWhatLogoShouldAppear = () => {
        switch (succesfullyVerified) {
            case '0':
                return <div className={`bigLogo failedToVerifyEmail`} />
            case '1':
                return <div className={`bigLogo emailSuccessfullyVerified`} />
            default:
                return <div className={`bigLogo`}>
                    <img src={logo} onClick={() => history.push('/')} className="bigLogo" />
                </div>
        }
    }

    const pickWhatTextShouldAppear = () => {
        switch (succesfullyVerified) {
            case '0':
                return <h1 className="h1">Falha ao verificar e-mail.</h1>
            case '1':
                return <h1 className="h1">E-mail verificado com sucesso!</h1>
            default:
                return <h1 className="h1">Verificando e-mail, aguarde...</h1>
        }
    }

    return (
        <div className="container">

            {pickWhatLogoShouldAppear()}

            <form className={Classes({ [Styles.form]: true, "form": true })} onSubmit={navToHome}>

                <div className="fullWidthComponent">

                    {pickWhatTextShouldAppear()}

                    <Separator text={null} />

                    <GenericBottomButton
                        onClick={() => null}
                        buttonText={'Continuar'}
                    />
                </div>
            </form>
        </div >
    );
}
