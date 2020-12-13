import React from "react";
import { useDispatch } from 'react-redux';

import { TurnOnLocationContainer, PCustom } from './TurnOnLocationStyle';
import { GenericModalContainer, GenericAppButton } from '../../commonComponents';
import * as Actions from '../../../actions';

export default function TurnOnLocation(props) {
    const dispatch = useDispatch();
    return <TurnOnLocationContainer>
        <GenericModalContainer {...props} title={'Encontramos um probleminha!'}>

            <PCustom>
                Para usar o App Namoro você precisa ativar o Compartilhamento de Localização.
                Acesse as configurações do seu navegador.
            </PCustom>

            <GenericAppButton
                customButtonStyle={{ margin: 30, width: 'auto' }}
                textButton={'ENTENDI'}
                // onPress={() => props.navigation.goBack()}
                onPress={() => dispatch(Actions.signOut())}
            />

        </GenericModalContainer>
    </TurnOnLocationContainer>
}
