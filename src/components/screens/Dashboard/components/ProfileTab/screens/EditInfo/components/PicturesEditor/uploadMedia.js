import fileSize from 'filesize';
import { uniqueId } from 'lodash';

import { dangerNotification } from '../../../../../utils/Notifications';
import * as Actions from '../../../../../../actions/index';

export const uploadMedia = (files, userImages, dispatch) => {

    if (files.length + userImages.length <= 9) {

        if (!files.some(item => item.size > 4 * 1024 * 1024)) {
            const selectedFiles = files.map((file) => ({
                file,
                id: uniqueId(),
                imageUrl: URL.createObjectURL(file),
                readableSize: fileSize(file.size),
                progress: 0,
                uploaded: false,
                error: false
            }));

            uploadImages(selectedFiles, dispatch);
        }
        else
            dangerNotification('As imagens devem ser menores que 4MB!');
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
