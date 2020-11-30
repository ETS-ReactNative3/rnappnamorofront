import React from 'react';

import CoreElements from './CoreElements';
import ProfilePanel from './ProfilePanel';
import Styles from './ChatPanel.module.css';

export default () => {


    return (
        <div className={Styles.mainDiv}>

            <CoreElements />

            <ProfilePanel />

        </div>
    )
}
