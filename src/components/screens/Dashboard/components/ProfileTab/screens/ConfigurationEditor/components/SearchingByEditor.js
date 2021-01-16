import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

import * as Actions from '../../../../../../../../actions';
import { P } from '../../../../../../../../GlobalStyle';
import { ConfigItem, GenericScrollView } from '../../../../../../../commonComponents';

const PCustom = styled(P)`
    margin-top: 15px;
    margin-left: 10px;
`;

export default function SearchingByEditor() {

    const dispatch = useDispatch();

    const { key: searchingBy } = useSelector(state => state.dashboard.userData.searchingBy)

    const updateSearchingBy = (value) => dispatch(Actions.updateUser({ searchingBy: value }, true, true));

    const InfoText = () => {
        switch (searchingBy) {
            case 0:
                return <PCustom>{'Você só verá homens na Descoberta'}</PCustom>;
            case 1:
                return <PCustom>{'Você só verá mulheres na Descoberta'}</PCustom>;
            default:
                return <PCustom>{'Você verá todos na Descoberta'}</PCustom>;
        }
    }

    const customScrollViewStyle = {
        marginTop: 10,
        width: Dimensions.get('window').width
    }

    return <GenericScrollView customStyle={customScrollViewStyle}>

        <ConfigItem
            leftText={'HOMENS'}
            rightIconName={searchingBy == 0 ? 'check' : 'none'}
            onPress={() => updateSearchingBy(0)}
        />

        <ConfigItem
            leftText='MULHERES'
            rightIconName={searchingBy == 1 ? 'check' : 'none'}
            onPress={() => updateSearchingBy(1)}
        />

        <ConfigItem
            leftText='TODOS'
            rightIconName={searchingBy == 2 ? 'check' : 'none'}
            onPress={() => updateSearchingBy(2)}
        />

        <InfoText />

    </GenericScrollView>
}
