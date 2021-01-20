import ImagePicker from 'react-native-image-crop-picker';

import { dangerNotification } from '../../../../../../../../utils/Notifications';
import * as Actions from '../../../../../../../../../actions';

export function pickFile(userImagesLength, dispatch) {
    try {
        ImagePicker.openPicker({
            multiple: true,
            width: 300,
            height: 400,
            mediaType: 'photo'
        }).then(images => {

            const pickedImages = images.map(image => ({
                ...image,
                uri: image.path,
                type: image.mime,
                name: 'userImage'
            }))

            uploadMedia(pickedImages, userImagesLength, dispatch);
        });
    } catch (err) {
        console.log(err);
    }
}

export const uploadMedia = (files, userImagesLength, dispatch) => {

    if (files.length + userImagesLength <= 9) {

        if (!files.some(item => item.size > 5 * 1024 * 1024)) {
            const selectedFiles = files.map((file) => ({
                file,
                id: parseInt(Math.random(1, 999999) * 999),//(used to when finished upload the image, remove the preview from uploadingImagesPreview array)
                progress: 0,
                uploaded: false,
                error: false,
            }));

            uploadImages(selectedFiles, dispatch);
        }
        else
            dangerNotification('As imagens devem ser menores que 5MB!');
    }
    else
        dangerNotification('Impossível adicionar mais que nove imagens!');
}

const uploadImages = (selectedFiles, dispatch) => {

    selectedFiles.map(selectedFile => {

        const imageFormData = new FormData();

        imageFormData.append('file', selectedFile.file);

        dispatch(Actions.uploadImageToServer(imageFormData, selectedFile));
    });
}
