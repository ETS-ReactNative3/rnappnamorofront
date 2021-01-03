import React from 'react';
import styled from 'styled-components/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const Awesome5Icon = styled(FontAwesome)`
    font-size: 18px;
`;

const EvilIcon = styled(EvilIcons)`
    font-size: 18px;
`;

const IconContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${props => props.theme.$heightOfGenericComponent}px;
    height: ${props => props.theme.$heightOfGenericComponent}px;
`;

export default AwesomeIcon = (props) => {
    return <IconContainer style={props.customIconContainer}>
        {
            props.evilIcon ?
                <EvilIcon name={props.iconName} style={props.customIconStyle} solid={props.solidIcon} />
                : <Awesome5Icon name={props.iconName} style={props.customIconStyle} solid={props.solidIcon} />
        }
    </IconContainer>
}
