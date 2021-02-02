import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import * as Actions from '../../../../../../actions';
import { theme } from '../../../../../../constants/StyledComponentsTheme';
import { GenericRowView } from '../../../../../../GlobalStyle';
import { RoundIconButton } from '../../../../../commonComponents';
import { checkIfSuperLikeIsAvailable } from '../../../../../utils/Functions';

const MainContainer = styled(GenericRowView)`
    height: 90px;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px;
`;

export default function ControlButtons({ currentProfile }) {

    const dispatch = useDispatch();

    const lastTimeSuperLikeWasUsed = useSelector(state => {
        const { lastTimeSuperLikeWasUsed } = state.dashboard.userData;
        return lastTimeSuperLikeWasUsed;
    });
    const { $lightGray, $gray, $red, $lightGreen, $lightBlue } = theme;

    const [isSuperLikeAvailable, setIsSuperLikeAvailable] = useState(false);

    const ignoreCurrentProfile = () => dispatch(Actions.ignoreCurrentProfile(currentProfile?.id));

    const likeCurrentProfile = (superLike) => {
        superLike && setIsSuperLikeAvailable(false);
        dispatch(Actions.likeCurrentProfile(currentProfile, superLike));
    }

    useEffect(() => {
        setIsSuperLikeAvailable(checkIfSuperLikeIsAvailable(lastTimeSuperLikeWasUsed));
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
            onPress={ignoreCurrentProfile}
        />

        <RoundIconButton
            iconName={'star'}
            solidIcon
            customIconStyle={{ ...customIconStyle, color: isSuperLikeAvailable ? $lightBlue : $gray }}
            underlayColor={$lightGray}
            onPress={() => isSuperLikeAvailable && likeCurrentProfile(true)}
        />

        <RoundIconButton
            customButtonStyle={customButtonStyle}
            iconName={'heart'}
            solidIcon
            customIconStyle={{ ...customIconStyle, color: $lightGreen }}
            underlayColor={$lightGray}
            onPress={() => likeCurrentProfile(false)}
        />

    </MainContainer>
}
