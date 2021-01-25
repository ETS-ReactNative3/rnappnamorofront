import React from 'react';
import styled from 'styled-components';

import { theme } from '../../../../../../../constants/StyledComponentsTheme';
import noProfile from '../../../../../../../assets/noProfile.png';
import { GenericColumnView, P } from '../../../../../../../GlobalStyle';

const MatchItemBorderRadius = 80;

const MatchItemContainer = styled(GenericColumnView)`
    height: 100%;
    width: 80px;
    align-items: center;
    margin: 5px;
`;

const MatchItemButton = styled.TouchableHighlight`
    height: 80px;
    width: 80px;
    border-radius: ${MatchItemBorderRadius}px;
    background-color: white;
    padding: 2px;
    border-width: 2px;
    border-color: ${props => props.theme.$primaryColor};
`;

const MatchImage = styled.Image`
    height: 100%;
    width: 100%;
    border-radius: ${MatchItemBorderRadius}px;
`;

export default function MatchItem(matchItem) {

    const { userImages, firstName } = matchItem.item;

    const imageSource = userImages.length > 0 ? { uri: userImages[0].imageUrl } : noProfile;

    return <MatchItemContainer>

        <MatchItemButton underlayColor={theme.$lightGray} onPress={() => null}>
            <MatchImage source={imageSource} />        
        </MatchItemButton>

        <P>{firstName}</P>

    </MatchItemContainer>
}
