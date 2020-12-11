import React from 'react';
import styled from 'styled-components';
import RNMultiSlider from '@ptomasroos/react-native-multi-slider';

import { GenericColumnView, P, GenericRowView } from '../../GlobalStyle';
import { theme } from '../../constants/StyledComponentsTheme';

const MainContainer = styled(GenericColumnView)`
    height: 70px;
    padding: 10px;
`;

const MultiSliderComponentCustom = styled(RNMultiSlider)`
    height: 100%;
    width: 100%;
    position: absolute;
    justify-content: center;
    align-items: center;
`;

const PCustom = styled(P)`
    flex: 1;
    text-align: right;
`;

export default MultiSlider = (props) => {

    const { values, title, rightText, min, max } = props;

    return <MainContainer>
        
        <GenericRowView>

            <P>{title}</P>

            {
                values.length > 1 ?
                    <PCustom>Entre {values[0]} e {values[1]}{values[1] === max && '+'}</PCustom>
                    :
                    <PCustom>{`${values[0]} ${rightText}`}{values[0] === max && '+'}</PCustom>
            }

        </GenericRowView>

        <MultiSliderComponentCustom
            min={min}
            max={max}
            values={values}
            sliderLength={325}
            markerStyle={{ height: 30, width: 30, borderRadius: 40, backgroundColor: theme.$primaryColor }}
            selectedStyle={{ backgroundColor: theme.$primaryColor }}
            containerStyle={{ alignItems: 'center' }}
            onValuesChange={(value) => props.onValuesChange(value)}
            onValuesChangeFinish={(value) => props.onValuesChangeFinish && props.onValuesChangeFinish(value)}
        />
    </MainContainer>
}
