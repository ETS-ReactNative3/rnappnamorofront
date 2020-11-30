import styled from 'styled-components';

export const LoginCardContainer = styled.View`
    padding: 40px 15px 15px;
    border-radius: ${props => props.theme.$mediumBorderRadius};
    text-align: center;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    elevation: 10;
`;

export const SocialButtonsContainer = styled.View`
    margin-top: 15px;
    width: 100%;
`;
