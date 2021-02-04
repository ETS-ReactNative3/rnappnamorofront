import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import * as Actions from '../../../../../../actions';
import { theme } from '../../../../../../constants/StyledComponentsTheme';
import { GenericRowView } from '../../../../../../GlobalStyle';
import { RoundIconButton } from '../../../../../commonComponents';
import { checkIfSuperLikeIsAvailable } from '../../../../../utils/Functions';
import { ignoreCurrentProfile, likeCurrentProfile } from './MatchSearcherFunctions';

const MainContainer = styled(GenericRowView)`
    height: 90px;
    justify-content: space-evenly;
    align-items: center;
    padding-left: 40px;
    padding-right: 40px;
`;

export default function ControlButtons({ currentProfile }) {

    const dispatch = useDispatch();

    const lastTimeSuperLikeWasUsed = useSelector(state => {
        const { lastTimeSuperLikeWasUsed } = state.dashboard.userData;
        return lastTimeSuperLikeWasUsed;
    });
    const { isSuperLikeAvailable } = useSelector(state => state.dashboard);

    const { $lightGray, $gray, $red, $lightGreen, $lightBlue } = theme;

    const handleLikeCurrentProfile = (superLike) => likeCurrentProfile(dispatch, superLike, currentProfile);

    useEffect(() => {
        dispatch(Actions.updateIsSuperLikeAvailable(checkIfSuperLikeIsAvailable(lastTimeSuperLikeWasUsed)));
    }, [lastTimeSuperLikeWasUsed]);

    const customButtonStyle = {
        height: 70,
        width: 70
    };

    const customIconStyle = {
        fontSize: 25
    };

    return <MainContainer>

        <RoundIconButton
            customButtonStyle={customButtonStyle}
            iconName={'times'}
            customIconStyle={{ ...customIconStyle, color: $red }}
            underlayColor={$lightGray}
            onPress={() => ignoreCurrentProfile(dispatch, currentProfile?.id)}
        />

        <RoundIconButton
            iconName={'star'}
            solidIcon
            customIconStyle={{ ...customIconStyle, color: isSuperLikeAvailable ? $lightBlue : $gray }}
            underlayColor={$lightGray}
            onPress={() => isSuperLikeAvailable && handleLikeCurrentProfile(true)}
        />

        <RoundIconButton
            customButtonStyle={customButtonStyle}
            iconName={'heart'}
            solidIcon
            customIconStyle={{ ...customIconStyle, color: $lightGreen }}
            underlayColor={$lightGray}
            onPress={() => handleLikeCurrentProfile(false)}
        />

    </MainContainer>
}
