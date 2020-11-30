import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components';

export const Container = styled.View`
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: lightblue;
`;

export const ImageBackgroundContainer = styled.ImageBackground`
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const BigLogo = styled.Image`
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

export const H2 = styled.Text`
    font-weight: 100;
    font-size: 25px;
`;

export const GenericRowView = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const GenericColumnView = styled.View`
    flex-direction: column;
    align-items: center;
`;

export const AwesomeIcon = styled(FontAwesome)`
    font-size: 20px;
`;
