import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const Awesome5Icon = styled(FontAwesome)`
    font-size: 18px;
`;

const IconView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${props => props.theme.$heightOfGenericComponents}px;
    height: ${props => props.theme.$heightOfGenericComponents}px;
`;

export default AwesomeIcon = (props) => {
    return <IconView>
        <Awesome5Icon name={props.iconName} style={props.customIconStyle} solid={props.solidIcon} />
    </IconView>
}
