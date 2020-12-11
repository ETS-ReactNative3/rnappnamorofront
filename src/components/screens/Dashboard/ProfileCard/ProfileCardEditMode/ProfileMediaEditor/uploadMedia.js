import fileSize from 'filesize';
import { uniqueId } from 'lodash';
import { useSelector } from 'react-redux';

import { dangerNotification } from '../../../../../utils/Notifications';
import { decodeJwtToken, handleError } from '../../../../../utils/Functions';
import * as Actions from '../../../../../../actions/index';
import Api from '../../../../../utils/Api';

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

    const { accessToken } = useSelector(state => state.auth);

    selectedFiles.map(item => {

        const userId = decodeJwtToken(accessToken).id;

        const data = new FormData();
        data.append('file', item.file);

        Api({ accessToken }).post(`users/user_images/${userId}`, data, {
            onUploadProgress: e => {

                const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                dispatch(Actions.updateUploadingImagesPreview({ ...item, progress }));
            }
        }).then(() => {

            dispatch(Actions.updateUploadingImagesPreview(null, item.id));
            dispatch(Actions.getUserData(true));

        }, error => {
            handleError(error);
        });
    });
}
