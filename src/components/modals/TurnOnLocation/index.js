import React from "react";

import { TurnOnLocationContainer, PCustom } from './TurnOnLocationStyle';
import { GenericModalContainer, GenericAppButton } from '../../commonComponents';

export default function TurnOnLocation(props) {

    return <TurnOnLocationContainer>
        <GenericModalContainer {...props} title={'Encontramos um probleminha!'}>

            <PCustom>
                Para usar o App Namoro você precisa ativar o Compartilhamento de Localização.
                Acesse as configurações do aplicativo.
            </PCustom>

            <GenericAppButton
                customButtonStyle={{ margin: 30, width: 'auto' }}
                textButton={'ENTENDI'}
                onPress={() => props.navigation.goBack()}
            />

        </GenericModalContainer>
    </TurnOnLocationContainer>
}
