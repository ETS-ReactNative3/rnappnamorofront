import React from 'react';
import styled from 'styled-components/native';

const AppLogoImage = styled.Image`
    max-width: 450px;
    min-width: 300px;
    min-height: 120px;
    max-height: 150px;
    width: 50%;
    resize-mode: contain;
    display: flex;
    justify-content: center;
    align-items: center;    
`;

export default AppLogo = (props) => {
    return <AppLogoImage source={props.source} />
}
