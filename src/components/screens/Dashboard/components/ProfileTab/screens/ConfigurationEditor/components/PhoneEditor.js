import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { theme } from '../../../../../../../../constants/StyledComponentsTheme';
import * as Actions from '../../../../../../../../actions';
import { GenericAppButton, TextInputRightIconButton, GenericScrollView } from '../../../../../../../commonComponents';

export default function PhoneEditor({ navigation }) {

    const dispatch = useDispatch();

    const { phone } = useSelector(state => state.dashboard.userData);

    const [phoneLocal, setPhoneLocal] = useState(phone);
    const [isUpdateButtonEnable, setIsUpdateButtonEnable] = useState(false);

    useEffect((() => {
        setIsUpdateButtonEnable(phoneLocal != '' && phone !== phoneLocal);
    }), [phoneLocal]);

    const customButtonStyle = {
        backgroundColor: !isUpdateButtonEnable && theme.$lightGray,
        alignSelf: 'center',
        marginTop: 20
    }

    const updateUserPhone = () => {
        isUpdateButtonEnable && dispatch(Actions.updateUser({ phone: phoneLocal }, true)).then(() => navigation.goBack());
    }

    return <GenericScrollView>

        <TextInputRightIconButton
            placeholder={'Digite seu telefone aqui'}
            keyboardType={'phone-pad'}
            value={phone}
            onChangeText={(value) => setPhoneLocal(value)}
        />

        <GenericAppButton
            underlayColor={!isUpdateButtonEnable && theme.$lightGray}
            customButtonStyle={customButtonStyle}
            textButton='Atualizar telefone'
            onPress={updateUserPhone}
        />

    </GenericScrollView>
}
