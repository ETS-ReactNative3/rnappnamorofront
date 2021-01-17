import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { theme } from '../../../../../../../../../constants/StyledComponentsTheme';
import { RoundCloseButton } from '../../../../../../../../commonComponents';
import noProfile from '../../../../../../../../../assets/noProfile.png';

const UserImageContainer = styled.View`
    flex: 1;
    padding: 15px;
    background-color: white;
    border-width: 0.5px;
    border-style: dotted;
    border-color: ${props => props.theme.$lightGray};
`;

const Button = styled.TouchableHighlight`
    flex: 1;
`;

const ButtonContainer = styled.View`
    flex: 1;
`;

const UserImage = styled.Image`
    height: 100%;
    width: 100%;
    border-radius: ${props => props.theme.$smallBorderRadius};
`;

export default function PictureItem({ PictureItem }) {

    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.dashboard);
    const { accessToken } = useSelector(state => state.auth);

    const handleDeletePicture = () => {

        localStorage.setItem('selectedUserImageId', PictureItem.id);

        dispatch(Actions.showGenericYesNoModal(
            true,
            'Excluir imagem?',
            'Esta ação não pode ser desfeita.',
            'Excluir',
            'Cancelar',
            'genericYesNoModalDeleteUserImage'
        ));
        // navigation.push('GenericYesNoModal', {
        //     title: 'Excluir conta?',
        //     subtitle: 'Todos os dados serão apagados. Esta ação não pode ser desfeita!',
        //     acceptText: 'Excluir',
        //     denyText: 'Cancelar',
        //     selectedMethod: 'genericYesNoModalDeleteAccount'
        // });
    }

    const imageSource = PictureItem.imageUrl ? { uri: PictureItem.imageUrl } : noProfile;

    const customButtonStyle = {
        position: 'absolute',
        height: 40,
        width: 40,
        right: -15,
        top: -15,
        backgroundColor: 'white'
    };

    return <UserImageContainer>
        <Button underlayColor={theme.$darkGray} onPress={() => null}>
            <ButtonContainer>

                <UserImage
                    source={imageSource}
                />

                {
                    // PictureItem.progress > 0 &&
                    // <div className={Styles.circularProgressBar}>
                    //     <CircularProgressbar
                    //         styles={{
                    //             root: { width: 32, alignSelf: 'center' },
                    //             path: { stroke: 'var(--primaryColor)' },
                    //         }}
                    //         strokeWidth={10}
                    //         value={PictureItem.progress}
                    //     />
                    // </div>
                }

                {
                    PictureItem.imageUrl && PictureItem.uploaded &&
                    <RoundCloseButton
                        customIconStyle={{ fontSize: 23, color: theme.$red }}
                        customButtonStyle={customButtonStyle}
                        onPress={() => null}
                    />
                }

            </ButtonContainer>
        </Button>
    </UserImageContainer>
}
