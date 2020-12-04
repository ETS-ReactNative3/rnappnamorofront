import styled from 'styled-components';

export const Container = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const ImageBackgroundContainer = styled.ImageBackground`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const H2 = styled.Text`
    font-weight: 100;
    font-size: 25px;
`;

export const P = styled.Text`
    font-weight: 100;
    font-size: 15px;
    color: ${props => props.theme.$lightTextColor};
`;

export const GenericRowView = styled.View`
    flex-direction: row;
    width: 100%;
`;

export const GenericColumnView = styled.View`
    flex-direction: column;
    width: 100%;
`;
