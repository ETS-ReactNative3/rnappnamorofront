import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { P } from '../../../../../../../../GlobalStyle';
import { theme } from '../../../../../../../../constants/StyledComponentsTheme';
import * as Actions from '../../../../../../../../actions';
import { GenericAppButton, TextInputRightIconButton } from '../../../../../../../commonComponents';
import { dangerNotification } from '../../../../../../../utils/Notifications';
import { emailValidator } from '../../../../../../../utils/Functions';

const ScrollViewCustom = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.$defaultDarkerBackgroundColor};
`;

const PCustom = styled(P)`
    margin-left: 10px;
    margin-top: 15px;
    background-color: ${props => props.theme.$defaultDarkerBackgroundColor};
`;

export default function EmailEditor() {

    const dispatch = useDispatch();

    const { verifiedEmail, email } = useSelector(state => state.dashboard.userData);

    const [emailLocal, setEmailLocal] = useState(email);
    const [verifiedEmailLocal, setVerifiedEmailLocal] = useState(verifiedEmail);

    const sendVerificationEmail = async () => {

        if (!verifiedEmailLocal)
            if (emailValidator(emailLocal)) {
                if (emailLocal && emailLocal !== email)
                    dispatch(Actions.sendVerificationEmail(emailLocal));
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
        width: '80%',
        alignSelf: 'center',
        marginTop: 20
    }

    return <ScrollViewCustom>

        <TextInputRightIconButton
            placeholder={'Digite seu email aqui'}
            showRightButton
            solidIcon
            customContainerStyle={{ width: '96%' }}
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
            onPress={() => sendVerificationEmail()}
        />

    </ScrollViewCustom>
}
