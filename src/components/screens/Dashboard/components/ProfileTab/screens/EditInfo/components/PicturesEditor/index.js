import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

import { SectionTitle, GenericAppButton } from '../../../../../../../../commonComponents';
import { GenericContainer, GenericColumnView } from '../../../../../../../../../GlobalStyle';
import Pictures from './Pictures';

const PicturesEditorContainer = styled(GenericContainer)`
    height: auto;
    justify-content: flex-start;
`;

const PicturesContainer = styled(GenericColumnView)`
    height: ${(Dimensions.get('window').height / 100) * 65};
    margin: 10px;
`;

export default function PicturesEditor() {
    return <PicturesEditorContainer>

        <SectionTitle titleText='ADICIONE FOTOS SUAS' />

        <PicturesContainer>
            <Pictures />
        </PicturesContainer>

        <GenericAppButton
            customButtonStyle={{ margin: 20 }}
            textButton='ADICIONAR MÍDIA'
            onPress={null}
        />

    </PicturesEditorContainer>
}
