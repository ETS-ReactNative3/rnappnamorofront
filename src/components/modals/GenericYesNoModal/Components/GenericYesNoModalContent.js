import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import * as Actions from '../../../../actions';
import { GenericRowView, GenericColumnView, P } from '../../../../GlobalStyle';
import { GenericAppButton } from '../../../commonComponents';

export const PCustom = styled(P)`
    margin-top: 10px;
    text-align: center;
`;

export default function GenericYesNoModalContent(props) {

    const { subtitle, acceptText, denyText, selectedMethod, selectedUserImageId, matchProfile } = props.route.params;

    const dispatch = useDispatch();

    const customButtonStyle = {
        flex: 1,
        margin: 10,
        marginTop: 40,
        width: 'auto',
    }

    const handleClose = () => props.navigation.goBack();

    const acceptMethod = () => {
        try {
            switch (selectedMethod) {
                case 'genericYesNoModalDeleteAccount':
                    handleClose();
                    dispatch(Actions.deleteAccount());
                    break;
                case 'genericYesNoModalUnmatch':
                    dispatch(Actions.unmatch(matchProfile.id));
                    break;
                case 'genericYesNoModalDeleteUserImage':
                    dispatch(Actions.deleteUserImage(selectedUserImageId));
                    break;
                default:
                    break;
            }
        } catch (error) {
            handleError(error);
        }
    }

    return <GenericColumnView>

        <PCustom>{subtitle}</PCustom>

        <GenericRowView>
            <GenericAppButton
                customButtonStyle={customButtonStyle}
                textButton={denyText}
                onPress={handleClose}
            />

            <GenericAppButton
                customButtonStyle={customButtonStyle}
                textButton={acceptText}
                onPress={acceptMethod}
            />
        </GenericRowView>

    </GenericColumnView>
}
