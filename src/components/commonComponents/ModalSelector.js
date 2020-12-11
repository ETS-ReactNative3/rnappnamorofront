import React, { useState } from 'react';
import styled from 'styled-components';
import RNModalSelector from 'react-native-modal-selector'

import { GenericRowView, P } from '../../GlobalStyle';

const MainContainer = styled(GenericRowView)`
    height: ${props => props.theme.$heightOfGenericComponents}px;
    width: 100%;
    margin-top: 10px;
    background-color: ${props => props.theme.$lightGray};
    border-radius: ${props => props.theme.$smallBorderRadius};
    padding: 1px 4px;
    align-items: center;
    justify-content: center;
    text-align: left;
`;

const RNModalSelectorCustom = styled(RNModalSelector)`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: white;
`;
const TextContainer = styled(GenericRowView)`
    flex: 1;
    text-align: center;
    justify-content: center;
`;

const PCustom = styled(P)`
    height: 100%;
    width: 100%;
    padding: 10px 0 10px 10px;
`;

export default ModalSelector = (props) => {

    const { selectedItem, title, data } = props;

    const titleSection = [
        { key: -1, section: true, label: title },
    ];

    return <MainContainer>
        <RNModalSelectorCustom
            data={titleSection.concat(data)}
            supportedOrientations={['portrait']}
            onChange={(option) => props.handleChange(option)}>

            <TextContainer>
                <PCustom>{selectedItem && selectedItem.label ? selectedItem.label : title}</PCustom>
            </TextContainer>

        </RNModalSelectorCustom>
    </MainContainer>
}
