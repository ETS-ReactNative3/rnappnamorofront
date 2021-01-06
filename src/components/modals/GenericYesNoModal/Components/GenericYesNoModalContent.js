import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import * as Actions from '../../../../actions';
import { GenericRowView, GenericColumnView, P } from '../../../../GlobalStyle';
import { GenericAppButton } from '../../../commonComponents';

export const PCustom = styled(P)`
    margin-top: 10px;
    text-align: center;
`;

export default function GenericYesNoModalContent() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { selectedMatchProfileData } = useSelector(state => state.dashboard);

    const [subtitle, setSubtitle] = useState('');
    const [acceptText, setAcceptText] = useState('');
    const [denyText, setDenyText] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedUserImageId, setSelectedUserImageId] = useState('');

    useEffect(() => {
        getModalTextFromStorage();
    }, []);

    const getModalTextFromStorage = async () => {
        setSubtitle(await AsyncStorage.getItem('genericYesNoModalSubtitle'));
        setAcceptText(await AsyncStorage.getItem('genericYesNoModalAcceptText'));
        setDenyText(await AsyncStorage.getItem('genericYesNoModalDenyText'));

        setSelectedMethod(await AsyncStorage.getItem('genericYesNoModalSelectedMethod'));
        setSelectedUserImageId(await AsyncStorage.getItem('selectedUserImageId'));
    }

    const customButtonStyle = {
        flex: 1,
        margin: 10,
        marginTop: 40,
        width: 'auto',
    }

    const handleClose = () => navigation.goBack()

    const acceptMethod = () => {
        try {
            switch (selectedMethod) {
                case 'genericYesNoModalDeleteAccount':
                    handleClose();
                    dispatch(Actions.deleteAccount());
                    break;
                case 'genericYesNoModalUnmatch':
                    dispatch(Actions.unmatch(selectedMatchProfileData.id));
                    break;
                case 'genericYesNoModalDeleteUserImage':
                    dispatch(Actions.deleteUserImage(selectedUserImageId));
                    break;
                default:
                    break;
            }
        } catch (error) {
            handleError(error);
        }
    }

    return <GenericColumnView>

        <PCustom>{subtitle}</PCustom>

        <GenericRowView>
            <GenericAppButton
                customButtonStyle={customButtonStyle}
                textButton={denyText}
                onPress={handleClose}
            />

            <GenericAppButton
                customButtonStyle={customButtonStyle}
                textButton={acceptText}
                onPress={acceptMethod}
            />
        </GenericRowView>

    </GenericColumnView>
}
