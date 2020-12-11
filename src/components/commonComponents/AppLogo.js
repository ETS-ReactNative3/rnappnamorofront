import React from 'react';
import styled from 'styled-components';

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

    @media (min-width: 0px) {
        margin-bottom: 10px;
    }
      
    @media (min-width: 768px) {
        margin-bottom: 30px;
    }
`;

export default AppLogo = (props) => {
    return <AppLogoImage source={props.source} />
}
