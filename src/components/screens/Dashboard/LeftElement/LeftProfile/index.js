import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import Styles from './LeftProfile.module.css';
import {
    InfoButton,
    SliderSelector,
    SliderRangeSelector,
    Switcher,
    SubtitleLeftElement,
    ProfileGenericButton,
    DevelopedBy,
    AppVersion
} from '../../../../utils/StatelessComponents';
import * as Actions from '../../../../../actions'

export default () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { userData, isLeftProfileEditorOpen, address } = useSelector(state => state.dashboard);
    const { isMouseButtonDown } = useSelector(state => state.utils);

    const [maxDistance, setMaxDistance] = useState(userData.maxDistance);
    const [ageRange, setAgeRange] = useState([userData.ageRange[0], userData.ageRange[1]]);
    const [showMeOnApp, setShowMeOnApp] = useState(userData.showMeOnApp);
    const [emailNotification, setEmailNotification] = useState(userData.emailNotification);
    const [pushNotification, setPushNotification] = useState(userData.pushNotification);

    const changeAgeRange = (value) => setAgeRange([value[0], value[1]]);

    const showLeftProfileEditor = (selectedLeftProfileEditor) => {
        dispatch(Actions.updateSelectedLeftProfileEditor(selectedLeftProfileEditor));
    }

    const signOut = () => {
        dispatch(Actions.signOut());
    }

    useEffect(() => {
        if (showMeOnApp !== userData.showMeOnApp)
            dispatch(Actions.updateUser({ showMeOnApp }, false))
    }, [showMeOnApp])

    useEffect(() => {
        if (emailNotification !== userData.emailNotification)
            dispatch(Actions.updateUser({ emailNotification: emailNotification ? 1 : 0 }, false))
    }, [emailNotification])

    useEffect(() => {
        if (pushNotification !== userData.pushNotification)
            dispatch(Actions.updateUser({ pushNotification: pushNotification ? 1 : 0 }, false))
    }, [pushNotification])

    useEffect(() => {
        //this is basically a "onMouseUp" event for the sliders: ageRange and maxDistance
        if (!isMouseButtonDown && !isLeftProfileEditorOpen) {
            //updates only if a change was made
            if (maxDistance != userData.maxDistance)
                dispatch(Actions.updateUser({ maxDistance }, false, null, true))

            if (userData.ageRange[0] !== ageRange[0] || userData.ageRange[1] !== ageRange[1])
                dispatch(Actions.updateUser({ ageRange: `${ageRange[0]},${ageRange[1]}` }, false, null, true))
        }
    }, [isMouseButtonDown])

    useEffect(() => {
        setMaxDistance(userData.maxDistance);
        setAgeRange([userData.ageRange[0], userData.ageRange[1]]);
        setShowMeOnApp(userData.showMeOnApp);
        setEmailNotification(userData.emailNotification);
        setPushNotification(userData.pushNotification);
    }, [userData]);

    const showContactModal = () => {
        dispatch(Actions.showContactModal(true));
    }

    const showGenericYesNoModal = () => {
        dispatch(Actions.showGenericYesNoModal(
            true,
            'Excluir conta?',
            'Todos os dados serão apagados, esta ação não pode ser desfeita!',
            'Excluir',
            'Cancelar',
            'genericYesNoModalDeleteAccount'
        ));
    }

    return <Scrollbars autoHide>
        <div className={Styles.container}>
            <SubtitleLeftElement title="CONFIGURAÇÕES DA CONTA" />

            <InfoButton iconClass={'fa fa-angle-right'} onClick={() => showLeftProfileEditor('email')} leftText="E-mail" rightText={userData.email} />
            <InfoButton iconClass={'fa fa-angle-right'} onClick={() => showLeftProfileEditor('phone')} leftText="Número de telefone" rightText={userData.phone} />

            <SubtitleLeftElement title="AJUSTES DE DESCOBERTA" />

            <InfoButton onClick={() => showLeftProfileEditor('location')} iconClass={'fa fa-angle-right'} leftText="Localização" rightText={address} />

            <SliderSelector
                title="Distância máxima"
                value={maxDistance}
                onChange={setMaxDistance}
                borderColor={'var(--separatorColor)'}
            />

            <SliderRangeSelector
                title="Faixa etária"
                value={ageRange}
                onChange={changeAgeRange}
                borderColor={'var(--separatorColor)'}
            />

            <InfoButton onClick={() => showLeftProfileEditor('searchingBy')} iconClass={'fa fa-angle-right'} leftText="Procurando por" rightText={userData.searchingByDesc} />

            <Switcher
                leftText={"Mostrar-me no App"}
                changeShowMeOnApp={setShowMeOnApp}
                showMeOnApp={showMeOnApp}
            />

            <SubtitleLeftElement title="NOTIFICAÇÕES" />

            <Switcher
                leftText={"E-mail"}
                changeShowMeOnApp={setEmailNotification}
                showMeOnApp={emailNotification}
            />
            <Switcher
                leftText={"Notificações por Push"}
                changeShowMeOnApp={setPushNotification}
                showMeOnApp={pushNotification}
            />

            <SubtitleLeftElement title="CONTATO" />

            <InfoButton onClick={() => showContactModal()} iconClass={'fa fa-angle-right'} leftText="Ajuda e Suporte" rightText="" />

            <SubtitleLeftElement title="JURÍDICO" />

            <InfoButton onClick={() => history.push('/terms')} iconClass={'fa fa-angle-right'} leftText="Termos de Uso" rightText="" />

            <ProfileGenericButton
                enable={true}
                onClick={signOut}
                type="button"
                textAlign="center"
                buttonText="Sair"
            />

            <ProfileGenericButton
                enable={true}
                onClick={showGenericYesNoModal}
                type="button"
                textAlign="center"
                buttonText="Excluir conta"
            />

            <div style={{ marginTop: '15px' }}>
                <DevelopedBy />
            </div>

            <AppVersion />

        </div>
    </Scrollbars>
}
