import React from 'react';
import styled from 'styled-components/native';

const ScrollViewCustom = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

export default GenericScrollView = ({ children, customStyle }) => {
    return <ScrollViewCustom style={customStyle}>
        {children}
    </ScrollViewCustom>
}
