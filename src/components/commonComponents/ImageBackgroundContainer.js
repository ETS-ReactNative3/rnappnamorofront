import React from 'react';
import styled from 'styled-components';

const ImageBackground = styled.ImageBackground`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default ImageBackgroundContainer = (props) => {
    return <ImageBackground source={props.source}>
        {props.children}
    </ImageBackground>
}
