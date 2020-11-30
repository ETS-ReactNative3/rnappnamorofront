import React from 'react';
import Scrollbars from 'react-custom-scrollbars';

import ProfileMediaEditor from './ProfileMediaEditor';
import ProfileInfoEditor from './ProfileInfoEditor';

export default () => {

    return (
        <Scrollbars autoHide>

            <ProfileMediaEditor />

            <ProfileInfoEditor />

        </Scrollbars>
    )
}
