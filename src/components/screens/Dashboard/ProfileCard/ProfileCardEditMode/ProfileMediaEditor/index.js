import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';

import { PictureItem } from './PictureItem';
import { uploadMedia } from './uploadMedia';
import Styles from './ProfileMediaEditor.module.css';

export default () => {

    const dispatch = useDispatch();

    const { userData, uploadingImagesPreview } = useSelector(state => state.dashboard);

    const profileMediaRender = () => {

        const pictureItemsArray = [];

        //uploading images should appear together with profile images (but showing a progressbar):
        const helperArray = userData.UserImages.concat(uploadingImagesPreview);

        for (var i = 0; i <= 8; i++) {
            pictureItemsArray.push(
                <PictureItem
                    key={i}
                    handleUpload={uploadMedia}
                    PictureItem={helperArray[i] || {}}
                />
            )
        }

        //splits pictureItemsArray (9 slots) by 3 arrays, containing 3 items each new array
        const pictureItemsArray1 = pictureItemsArray.slice(0, 3);
        const pictureItemsArray2 = pictureItemsArray.slice(3, 6);
        const pictureItemsArray3 = pictureItemsArray.slice(6, 9);
        const lineArrays = [pictureItemsArray1, pictureItemsArray2, pictureItemsArray3];

        const finalArray = [];

        for (i = 0; i <= 2; i++) {
            finalArray.push(
                <div key={i}>
                    {lineArrays[i]}
                </div>
            )
        }

        return <div style={{ flexDirection: 'column' }}>
            {finalArray}
        </div>
    }

    const tipText = () => {
        return <h3 className="h5" style={{ textAlign: 'center', marginTop: '10px' }}>
            {`Arraste e solte uma imagem em uma área pontilhada acima ou clique no botão de adicionar`}
        </h3>
    }

    const addMediaButton = () => {
        return <Dropzone accept="image/*" onDropAccepted={(e) => uploadMedia(e, userData.UserImages, dispatch)}>
            {
                ({ getRootProps, getInputProps }) => (

                    <div>
                        <button
                            type="button"
                            className="fullWidthButton doneButton"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            ADICIONAR MÍDIA
                        </button>
                    </div>
                )
            }
        </Dropzone>
    }

    return (
        <div className={Styles.profileMediaDiv}>

            {userData.UserImages && profileMediaRender()}

            {tipText()}

            {addMediaButton()}

        </div>
    )
}
