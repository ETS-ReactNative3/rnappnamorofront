import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../../../../../../../constants/StyledComponentsTheme';
import * as Actions from '../../../../../../../../actions';
import {
    SectionTitle,
    ConfigItem,
    MultiSlider,
    DevelopedBy,
    AppVersion
} from '../../../../../../../commonComponents';

const ScrollViewCustom = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.$defaultDarkerBackgroundColor};
`;

export default function EmailEditor() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const {
        email,
        phone,
        address,
        searchingByDesc,
        maxDistance,
        ageRange,
        showMeOnApp,
        emailNotification,
        pushNotification
    } = useSelector(state => state.dashboard.userData);

    const { userData } = useSelector(state => state.dashboard);

    const [maxDistanceLocal, setMaxDistanceLocal] = useState(maxDistance);
    const [ageRangeLocal, setAgeRangeLocal] = useState([ageRange[0], ageRange[1]]);
    const [showMeOnAppLocal, setShowMeOnAppLocal] = useState(showMeOnApp);
    const [emailNotificationLocal, setEmailNotificationLocal] = useState(emailNotification);
    const [pushNotificationLocal, setPushNotificationLocal] = useState(pushNotification);

    useEffect(() => {
        setMaxDistanceLocal([maxDistance]);
        setAgeRangeLocal([ageRange[0], ageRange[1]]);
        setShowMeOnAppLocal(showMeOnApp);
        setEmailNotificationLocal(emailNotification);
        setPushNotificationLocal(pushNotification);
    }, [userData]);

    const multiSliderCustomStyle = {
        backgroundColor: 'white',
        borderColor: theme.$lightGray,
        borderWidth: 1,
        marginBottom: -1,
        height: 90
    };

    const handleDeleteAccountPress = () => {
        dispatch(Actions.showGenericYesNoModal(
            'Excluir conta?',
            'Todos os dados serão apagados, esta ação não pode ser desfeita!',
            'Excluir',
            'Cancelar',
            'genericYesNoModalDeleteAccount'
        ));

        changeScreen('GenericYesNoModal');
    }

    const changeScreen = (screenName) => navigation.push(screenName);

    const updateUserData = (newUserData) => dispatch(Actions.updateUser(newUserData));

    const handleTermsPress = () => Linking.openURL('https://www.appnamoro.com/terms');

    return <ScrollViewCustom>

        <SectionTitle titleText='CONFIGURAÇÕES DA CONTA' />

        <ConfigItem leftText='E-mail' rightText={email} onPress={() => changeScreen('ConfigurationEditor')} />

        <ConfigItem leftText='Número de telefone' rightText={phone} onPress={() => changeScreen('ConfigurationEditor')} />

        <SectionTitle titleText='AJUSTES DE DESCOBERTA' />

        <ConfigItem
            onPress={() => changeScreen('ConfigurationEditor')}
            leftText='Localização'
            rightText={address ? address : 'Não definida'}
        />

        <MultiSlider
            title={'Faixa etária'}
            customContainerStyle={multiSliderCustomStyle}
            values={ageRangeLocal}
            onValuesChange={(value) => setAgeRangeLocal([value[0], value[1]])}
            onValuesChangeFinish={() => updateUserData({ ageRange: `${ageRangeLocal[0]},${ageRangeLocal[1]}` })}
            min={18}
            max={55}
        />

        <MultiSlider
            title={'Distância máxima'}
            values={maxDistanceLocal}
            customContainerStyle={multiSliderCustomStyle}
            rightText={'km'}
            onValuesChange={(value) => setMaxDistanceLocal(value)}
            onValuesChangeFinish={(value) => updateUserData({ maxDistance: value[0] })}
            min={2}
            max={500}
        />

        <ConfigItem leftText='Procurando por' rightText={searchingByDesc} onPress={() => changeScreen('ConfigurationEditor')} />

        <ConfigItem
            handleSwitchChange={(value) => {
                setShowMeOnAppLocal(value), updateUserData({ showMeOnApp: value })
            }}
            leftText='Mostrar-me no App'
            isThisSwitch={true}
            isSwitchOn={showMeOnAppLocal}
        />

        <SectionTitle titleText='NOTIFICAÇÕES' />

        <ConfigItem
            handleSwitchChange={(value) => {
                setEmailNotificationLocal(value), updateUserData({ emailNotification: value })
            }}
            leftText='Email'
            isThisSwitch={true}
            isSwitchOn={emailNotificationLocal}
        />

        <ConfigItem
            handleSwitchChange={(value) => {
                setPushNotificationLocal(value), updateUserData({ pushNotification: value })
            }}
            leftText='Notificações por Push'
            isThisSwitch={true}
            isSwitchOn={pushNotificationLocal}
        />

        <SectionTitle titleText='CONTATO' />

        <ConfigItem onPress={() => changeScreen('ContactModal')} leftText='Ajuda e Suporte' />

        <SectionTitle titleText='JURÍDICO' />

        <ConfigItem onPress={handleTermsPress} leftText='Termos e uso' />

        <SectionTitle titleText='ZONA DE PERIGO' />

        <ConfigItem
            leftText='Excluir conta'
            onPress={handleDeleteAccountPress}
        />

        <DevelopedBy />

        <AppVersion />

    </ScrollViewCustom>
}
