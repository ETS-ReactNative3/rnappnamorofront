import React from 'react';
import styled from 'styled-components';

const ScrollViewCustom = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.$darkerBackgroundColor};
`;

export default GenericScrollView = ({ children, customStyle }) => {
    return <ScrollViewCustom keyboardShouldPersistTaps='handled' style={customStyle}>
        {children}
    </ScrollViewCustom>
}
