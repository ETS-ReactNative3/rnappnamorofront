import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';

import { SectionTitle } from '../../../../../../../../commonComponents';
import { GenericContainer } from '../../../../../../../../../GlobalStyle';

const PicturesEditorContainer = styled(GenericContainer)`
    height: auto;
    justify-content: flex-start;
`;

export default function PicturesEditor() {
    return <PicturesEditorContainer>

        <SectionTitle titleText='ADICIONE FOTOS SUAS' />

        <View style={{ height: 400, width: '100%', backgroundColor: 'orange' }}></View>

    </PicturesEditorContainer>
}
