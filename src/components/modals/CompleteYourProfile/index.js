import React, { useEffect } from "react";
import { BackHandler } from 'react-native';

import CompleteYourProfileContent from './components/CompleteYourProfileContent';
import { GenericModalContainer } from '../../commonComponents';

export default function CompleteYourProfile(props) {

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', resetNavHistoryAndGoHome)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', resetNavHistoryAndGoHome)
        }
    }, [])

    const handleCloseButtonPress = () => {
        props.navigation.goBack();
        resetNavHistoryAndGoHome();
    }

    const resetNavHistoryAndGoHome = () => props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
    });

    return <GenericModalContainer closeButtonPress={() => handleCloseButtonPress()} title={'Vamos completar seu perfil!'}>
        <CompleteYourProfileContent />
    </GenericModalContainer>
}
