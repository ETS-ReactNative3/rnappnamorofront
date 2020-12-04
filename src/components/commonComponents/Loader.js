import React from 'react';
import styled from 'styled-components';
import { Bars } from 'react-native-loader';

import { GenericRowView } from '../../GlobalStyle';

const LoaderView = styled(GenericRowView)`
    height: 100%;
    width: 100%;
    position: absolute;
    justify-content: center;
    align-items: center;
    elevation: 99999;/*this is because elevation are working like z-index*/
    background-color: ${props => props.theme.$opaqueBlackBackgroundColor};
`;

export default Loader = () => {
    return <LoaderView>
        <Bars size={10} color={'white'} />
    </LoaderView>
}
