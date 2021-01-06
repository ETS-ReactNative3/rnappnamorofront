import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import GenericYesNoModalContent from './Components/GenericYesNoModalContent';
import { GenericModalContainer } from '../../commonComponents';

export default function GenericYesNoModal(props) {

    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        getModalTitle();
    }, []);

    const getModalTitle = async () => setModalTitle(await AsyncStorage.getItem('genericYesNoModalTitle'));

    return <GenericModalContainer {...props} title={modalTitle}>
        <GenericYesNoModalContent />
    </GenericModalContainer>
}
