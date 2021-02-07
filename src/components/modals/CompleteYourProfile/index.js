import React, { useEffect } from "react";
import { BackHandler } from 'react-native';
import { useDispatch } from "react-redux";

import * as Actions from '../../../actions';
import CompleteYourProfileContent from './components/CompleteYourProfileContent';
import { GenericModalContainer } from '../../commonComponents';

export default function CompleteYourProfile() {

    const dispatch = useDispatch();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleCloseButtonPress)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleCloseButtonPress)
        }
    }, [])

    const handleCloseButtonPress = () => {
        dispatch(Actions.signOut());
    }

    return <GenericModalContainer closeButtonPress={() => handleCloseButtonPress()} title={'Vamos completar seu perfil!'}>
        <CompleteYourProfileContent />
    </GenericModalContainer>
}
