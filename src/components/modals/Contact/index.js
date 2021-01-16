import React from "react";

import ContactContent from './Components/ContactContent';
import { GenericModalContainer } from '../../commonComponents';

export default function SignUp(props) {
    return <GenericModalContainer closeButtonPress={() => props.navigation.goBack()} title={'Fale conosco!'}>
        <ContactContent />
    </GenericModalContainer>
}
