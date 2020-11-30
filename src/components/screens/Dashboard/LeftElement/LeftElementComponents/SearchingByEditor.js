import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    SubtitleLeftElement,
    InfoButton
} from '../../../../utils/StatelessComponents';
import * as Actions from '../../../../../actions';
import Styles from './LeftElementComponents.module.css';

export default () => {

    const dispatch = useDispatch();

    const { key: searchingBy } = useSelector(state => state.dashboard.userData.searchingBy)

    const updateSearchingBy = (value) => {
        dispatch(Actions.updateUser({ searchingBy: value }, false, false, true));
    }

    const pickWhatSubTextShouldAppear = () => {
        switch (searchingBy) {
            case 0:
                return <SubtitleLeftElement title="Você só verá homens na Descoberta" />;
            case 1:
                return <SubtitleLeftElement title="Você só verá mulheres na Descoberta" />;
            default:
                return <SubtitleLeftElement title="Você verá todos na Descoberta" />;
        }
    }

    const customInfoButton = { marginRight: '15px' };

    return (
        <div className={Styles.container}>

            <SubtitleLeftElement title="CONFIGURAÇÕES DA CONTA" />

            <InfoButton
                onClick={() => updateSearchingBy(0)}
                leftText="Homens"
                iconClass={searchingBy === 0 ? 'fas fa-check' : ''}
                iconStyle={{ ...customInfoButton, color: searchingBy === 0 ? 'var(--defaultRed)' : '' }}
            />

            <InfoButton
                onClick={() => updateSearchingBy(1)}
                leftText="Mulheres"
                iconClass={searchingBy === 1 ? 'fas fa-check' : ''}
                iconStyle={{ ...customInfoButton, color: searchingBy === 1 ? 'var(--defaultRed)' : '' }}
            />

            <InfoButton
                onClick={() => updateSearchingBy(2)}
                leftText="Todos"
                iconClass={searchingBy === 2 ? 'fas fa-check' : ''}
                iconStyle={{ ...customInfoButton, color: searchingBy === 2 ? 'var(--defaultRed)' : '' }}
            />

            {pickWhatSubTextShouldAppear()}
        </div>
    )
}
