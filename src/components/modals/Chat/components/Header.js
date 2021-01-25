import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import * as Actions from '../../../../actions';
import { RoundCloseButton } from '../../../commonComponents';
import { convertDateFormatToDDMMYYYY } from '../../../utils/Functions';
import { GenericRowView, P } from '../../../../GlobalStyle';

const HeaderContainer = styled(GenericRowView)`
    height: 100px;
    border-bottom-width: 0.9px;
    align-items: center;
    border-color: ${props => props.theme.$lightGray};
`;

const Image = styled.Image`
    height: 65px;
    width: 65px;
    margin-left: 5px;
    border-radius: 80px;
`;

export default function Header(props) {

    const dispatch = useDispatch();
    const { matchProfile, profileImage } = props.route.params;

    const handleCloseChatPanel = () => {

    }

    const unmatch = () => {
        dispatch(Actions.showGenericYesNoModal(
            true,
            'Desfazer match?',
            'Deseja mesmo desfazer essa match? Você pode não encontrar essa pessoa novamente na busca!',
            'CONTINUAR',
            'CANCELAR',
            'genericYesNoModalUnmatch'
        ));
    }

    return (
        <HeaderContainer>
            <Image source={profileImage} />

            <P>
                {
                    matchProfile && `Você deu match com ${matchProfile.firstName} em ${convertDateFormatToDDMMYYYY(new Date(matchProfile.UserMatch[0].updatedAt))}`
                }
            </P>

            {/* <div>
                <div>
                    <RoundButtonWithIcon
                        onClick={() => handleCloseChatPanel()}
                        iconClass={'far fa-times-circle'}
                        iconStyle={{ color: 'var(--separatorColor)' }}
                    />
                </div>

                <div className={Styles.unmatchButtonDiv}>
                    <RoundButtonWithIcon
                        onClick={() => unmatch()}
                        iconClass={'fas fa-user-slash'}
                        iconStyle={{ color: 'var(--separatorColor)' }}
                    />
                </div>
            </div> */}
        </HeaderContainer>
    )
}
