import React from 'react';

import { DevelopedBy, AppVersion } from '../../../../../utils/StatelessComponents';
import UserProfileCircle from './UserProfileCircle';
import Styles from '../../MobileDashboard.module.css';

export default () => {

    return <div className={Styles.container}>

        <UserProfileCircle />
        
        <DevelopedBy />

        <AppVersion />

    </div>
}
