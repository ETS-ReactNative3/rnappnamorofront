import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { RoundCloseButton, RoundImage, RoundIconButton } from '../../../commonComponents';
import { convertDateFormatToDDMMYYYY } from '../../../utils/Functions';
import { GenericRowView, GenericColumnView, P } from '../../../../GlobalStyle';
import { theme } from '../../../../constants/StyledComponentsTheme';

const HeaderContainer = styled(GenericRowView)`
    height: 100px;
    border-bottom-width: 0.9px;
    align-items: center;
    border-color: ${props => props.theme.$lightGray};
`;

const PCustom = styled(P)`
    flex: 1;
    margin-left: 10px;
    font-size: 16px;
`;

const RightButtonsContainer = styled(GenericColumnView)`
    width: ${props => props.theme.$heightOfGenericComponent}px;
    height: 100%;
    align-items: center;
`;

export default function Header(props) {

    const navigation = useNavigation();

    const { matchedProfile, profileImage } = props.route.params;

    const closeChat = () => navigation.goBack();

    const unmatch = () => {
        navigation.push('GenericYesNoModal', {
            matchedProfile,
            title: 'Desfazer match?',
            subtitle: 'Deseja mesmo desfazer essa match? Você pode não encontrar essa pessoa novamente na busca!',
            acceptText: 'CONTINUAR',
            denyText: 'CANCELAR',
            selectedMethod: 'genericYesNoModalUnmatch'
        });
    }

    return (
        <HeaderContainer>

            <RoundImage customImageStyle={{ marginLeft: 5 }} source={profileImage} />

            <PCustom>
                {matchedProfile && `Você deu match com `}
                <PCustom style={{ fontWeight: 'bold' }}>{matchedProfile.firstName.toUpperCase()}</PCustom>
                {`\nem ${convertDateFormatToDDMMYYYY(new Date(matchedProfile.matchInfo[0].updatedAt))}`}
            </PCustom>

            <RightButtonsContainer>

                <RoundCloseButton customButtonStyle={{ color: theme.$primaryColor }} onPress={closeChat} />

                <RoundIconButton
                    customButtonStyle={{
                        height: theme.$heightOfGenericComponent - 1,
                        width: theme.$heightOfGenericComponent - 1,
                        backgroundColor: 'white',
                        elevation: 0
                    }}
                    customIconStyle={{ color: theme.$primaryColor }}
                    iconName={'user-alt-slash'}
                    underlayColor={theme.$lightGray}
                    onPress={unmatch} />

            </RightButtonsContainer>

        </HeaderContainer>
    )
}
