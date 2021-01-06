import React from "react";

import ContactContent from './Components/ContactContent';
import { GenericModalContainer } from '../../commonComponents';

export default function SignUp(props) {
    return <GenericModalContainer {...props} title={'Fale conosco!'}>
        <ContactContent />
    </GenericModalContainer>
}
