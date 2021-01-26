import React from "react";

import GenericYesNoModalContent from './Components/GenericYesNoModalContent';
import { GenericModalContainer } from '../../commonComponents';

export default function GenericYesNoModal(props) {

    const { title } = props.route.params;

    return <GenericModalContainer closeButtonPress={() => props.navigation.goBack()} title={title.toUpperCase()}>
        <GenericYesNoModalContent {...props} />
    </GenericModalContainer>
}
