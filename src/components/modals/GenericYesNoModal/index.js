import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import GenericYesNoModalContent from './Components/GenericYesNoModalContent';
import { GenericModalContainer } from '../../commonComponents';

export default function GenericYesNoModal(props) {

    const { title } = props.route.params;

    return <GenericModalContainer {...props} title={title}>
        <GenericYesNoModalContent {...props} />
    </GenericModalContainer>
}
