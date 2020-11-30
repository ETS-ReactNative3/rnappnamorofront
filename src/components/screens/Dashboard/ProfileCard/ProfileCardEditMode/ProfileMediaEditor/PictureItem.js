import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';

import * as Actions from '../../../../../../actions/index';
import Styles from './ProfileMediaEditor.module.css';
import noProfile from '../../../../../../assets/noProfile.png';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-circular-progressbar/dist/styles.css';

export function PictureItem(props) {

    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.dashboard);

    const handleDeletePicture = () => {

        AsyncStorage.setItem('selectedUserImageId', props.PictureItem.id);

        dispatch(Actions.showGenericYesNoModal(
            true,
            'Excluir imagem?',
            'Essa ação não pode ser desfeita.',
            'Excluir',
            'Cancelar',
            'genericYesNoModalDeleteUserImage'
        ));
    }

    return <div className={Styles.pictureItem}>
        <Dropzone accept="image/*" onDropAccepted={(e) => props.handleUpload(e, userData.UserImages, dispatch)}>

            {
                ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (

                    <div
                        style={{
                            backgroundColor:
                                isDragActive ?
                                    isDragReject ?
                                        'var(--defaultLightRed)'
                                        : 'var(--defaultLightGreen)'
                                    : 'white'
                        }} className={Styles.pictureItem} {...getRootProps()}>
                        <div>
                            <img
                                src={props.PictureItem && props.PictureItem.imageUrl || noProfile}
                            />
                        </div>

                        {
                            props.PictureItem.progress > 0 &&
                            <div className={Styles.circularProgressBar}>
                                <CircularProgressbar
                                    styles={{
                                        root: { width: 32, alignSelf: 'center' },
                                        path: { stroke: 'var(--primaryColor)' },
                                    }}
                                    strokeWidth={10}
                                    value={props.PictureItem.progress}
                                />
                            </div>
                        }

                        <input {...getInputProps()} />
                    </div>

                )
            }
        </Dropzone >

        {
            props.PictureItem.imageUrl && props.PictureItem.uploaded &&
            <button className="fullWidthButton"
                onClick={handleDeletePicture}
                type="button">
                <i className={'fa fa-times'}></i>
            </button>
        }
    </div >
}
