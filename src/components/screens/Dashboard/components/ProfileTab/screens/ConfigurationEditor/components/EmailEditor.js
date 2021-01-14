import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { P } from '../../../../../../../../GlobalStyle';
import { theme } from '../../../../../../../../constants/StyledComponentsTheme';
import * as Actions from '../../../../../../../../actions';
import { GenericAppButton, TextInputRightIconButton, GenericScrollView } from '../../../../../../../commonComponents';
import { dangerNotification } from '../../../../../../../utils/Notifications';
import { emailValidator } from '../../../../../../../utils/Functions';

const PCustom = styled(P)`
    margin-top: 15px;
`;

export default function EmailEditor() {

    const dispatch = useDispatch();

    const { verifiedEmail, email } = useSelector(state => state.dashboard.userData);

    const [emailLocal, setEmailLocal] = useState(email);
    const [verifiedEmailLocal, setVerifiedEmailLocal] = useState(verifiedEmail);

    const sendEmailVerification = async () => {

        if (!verifiedEmailLocal)

            if (emailValidator(emailLocal)) {
                
                if (emailLocal && emailLocal !== email)
                    dispatch(Actions.sendEmailVerification(emailLocal));
                else dangerNotification('Preencha o campo antes de continuar!')

            }
            else dangerNotification('Digite um email válido!');
    }

    const changeEmailText = (value) => {
        setEmailLocal(value);
        setVerifiedEmailLocal(value == email);
    }

    const EmailStatusText = () => {
        return verifiedEmailLocal ? <PCustom>{'Email já verificado'}</PCustom>
            : <PCustom>{'Email ainda não verificado, verifique-o para aumentar sua segurança'}</PCustom>
    }

    const customButtonStyle = {
        backgroundColor: verifiedEmailLocal && theme.$lightGray,
        alignSelf: 'center',
        marginTop: 20
    }

    return <GenericScrollView>

        <TextInputRightIconButton
            placeholder={'Digite seu email aqui'}
            showRightButton
            keyboardType={'email-address'}
            solidIcon
            value={emailLocal}
            onChangeText={changeEmailText}
            customIconStyle={{ color: verifiedEmailLocal ? theme.$blue : theme.$red }}
            iconName={verifiedEmailLocal ? 'check' : 'times'}
            onButtonPress={null}
        />

        <EmailStatusText />

        <GenericAppButton
            underlayColor={verifiedEmailLocal && theme.$lightGray}
            customButtonStyle={customButtonStyle}
            textButton='Me envie um email de verificação'
            onPress={sendEmailVerification}
        />

    </GenericScrollView>
}
