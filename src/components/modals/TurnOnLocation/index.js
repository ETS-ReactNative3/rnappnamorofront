import React from "react";
import styled from 'styled-components';

import { GenericContainer, P } from '../../../GlobalStyle';
import { GenericModalContainer, GenericAppButton } from '../../commonComponents';

export const TurnOnLocationContainer = styled(GenericContainer)`
    padding: 10px;
`;

export const PCustom = styled(P)`
    margin-top: 10px;
    text-align: center;
`;

export default function TurnOnLocation(props) {
    return <TurnOnLocationContainer>
        <GenericModalContainer closeButtonPress={() => props.navigation.goBack()} title={'Encontramos um probleminha!'}>

            <PCustom>
                {`Para usar o App Namoro você precisa ativar o Compartilhamento de Localização. Acesse as configurações do aplicativo.

Caso tenha dúvidas em como fazer, um jeito fácil de resolver é desinstalar o app e instalar novamente.
Assim, quando entrar pela primeira vez, o App Namoro irá pedir permissão para acessar sua localização, então você seleciona "Permitir".`}
            </PCustom>

            <GenericAppButton
                customButtonStyle={{ margin: 30, width: 'auto' }}
                textButton={'ENTENDI'}
                onPress={() => props.navigation.goBack()}
            />

        </GenericModalContainer>
    </TurnOnLocationContainer>
}
