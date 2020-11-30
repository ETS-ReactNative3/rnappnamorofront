import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from '../../../../../../actions';
import { GenericHeader } from '../../../../../utils/StatelessComponents';
import LeftElement from '../../../../Dashboard/LeftElement';
import LeftProfileEditor from '../../../../Dashboard/LeftElement/LeftProfile/LeftProfileEditor';
import Styles from '../../MobileDashboard.module.css';

export default () => {

    const dispatch = useDispatch();

    const { isLeftProfileOpen, isLeftProfileEditorOpen } = useSelector(state => state.dashboard);

    const handleBackButton = () => {
        if (isLeftProfileEditorOpen)
            dispatch(Actions.showLeftProfileEditor(false));
        else {
            dispatch(Actions.showLeftProfile(false));
            dispatch(Actions.openMobileConfig(false));
        }
    }

    return <div className={Styles.container}>

        <GenericHeader title={'Configurações'} onClick={() => handleBackButton()} />

        <div className={Styles.MobileConfig}>
            {isLeftProfileOpen ? <LeftElement isMobile={true} shouldRenderLeftElementHeader={false} /> : <LeftProfileEditor />}
        </div>

    </div>
}
