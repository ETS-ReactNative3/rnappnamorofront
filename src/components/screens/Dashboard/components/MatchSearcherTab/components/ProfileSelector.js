import React from 'react';
import styled from 'styled-components';
import SwipeCards from 'react-native-swipe-cards';
import { useDispatch, useSelector } from 'react-redux';

import { GenericContainer } from '../../../../../../GlobalStyle';
import ProfileCard from './ProfileCard';
import { theme } from '../../../../../../constants/StyledComponentsTheme';
import { ignoreCurrentProfile, likeCurrentProfile } from './MatchSearcherFunctions';

const MainContainer = styled(GenericContainer)`
    flex: 1;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
`;

export default function ProfileSelector() {

    const dispatch = useDispatch();

    const { matchSearcherProfiles } = useSelector(state => state.dashboard);
    const { isSuperLikeAvailable } = useSelector(state => state.dashboard);
    const { $lightBlue, $green, $red } = theme;

    const handleLikeCurrentProfile = (superLike, currentProfile) => likeCurrentProfile(dispatch, superLike, currentProfile);

    const cards = [
        { id: 1, text: 'Tomato', backgroundColor: 'orange' },
        { id: 2, text: 'Aubergine', backgroundColor: 'purple' },
        { id: 3, text: 'Courgette', backgroundColor: 'green' },
        { id: 4, text: 'Blueberry', backgroundColor: 'blue' },
        { id: 5, text: 'Umm...', backgroundColor: 'red' },
        { id: 6, text: 'orange', backgroundColor: 'cyan' },
    ]

    return <MainContainer>
        <SwipeCards
            keyExtractor={item => item.id.toString()}
            cards={matchSearcherProfiles}
            renderCard={(cardData) => <ProfileCard {...cardData} />}
            // renderCard={(cardData) => <View style={{ height: 200, width: 200 }} {...cardData} />}
            smoothTransition={false}
            yupText={'Gostei'}
            yupStyle={{ borderColor: $green }}
            yupTextStyle={{ color: $green }}
            handleYup={(cardData) => handleLikeCurrentProfile(false, cardData)}

            nopeText={'Não gostei'}
            nopeStyle={{ borderColor: $red }}
            nopeTextStyle={{ color: $red }}
            handleNope={(cardData) => ignoreCurrentProfile(dispatch, cardData?.id)}

            showMaybe={isSuperLikeAvailable}
            hasMaybeAction={isSuperLikeAvailable}
            maybeText={'Super Like'}
            maybeStyle={{ borderColor: $lightBlue }}
            maybeTextStyle={{ color: $lightBlue }}
            handleMaybe={(cardData) => isSuperLikeAvailable && handleLikeCurrentProfile(true, cardData)}
        />
    </MainContainer>
}
