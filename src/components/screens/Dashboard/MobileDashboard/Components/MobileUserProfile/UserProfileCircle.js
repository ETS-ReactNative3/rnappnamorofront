import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Classes from 'classnames';

import { IconLabel } from '../../../../../utils/StatelessComponents';
import * as Actions from '../../../../../../actions';
import noProfile from '../../../../../../assets/noProfile.png'
import Styles from '../../MobileDashboard.module.css';

export default () => {

    const dispatch = useDispatch();

    const { userData } = useSelector(state => state.dashboard);

    const handleConfigButtonClick = () => {
        dispatch(Actions.openMobileConfig(true));
        dispatch(Actions.showLeftProfile(true));
    }

    const handleEditInfoButtonClick = () => {
        dispatch(Actions.openMobileEditInfo(true));
    }

    const userPersonalInfo = () => {
        return <div className={Styles.userPersonalInfo}>
            {
                userData.UserImages && userData.UserImages.length > 0 ?
                    <img
                        src={userData.UserImages[0].imageUrl}
                    />
                    :
                    <img
                        style={{ backgroundSize: 'contain' }}
                        src={noProfile}
                    />
            }

            <label>{`${userData.firstName || ''} ${userData.lastName || ''}, ${userData.age || ''}`}</label>            

            <span style={{marginTop: '5px'}}>{userData.position}</span>
            <span>{userData.schoolingDesc}</span>            
        </div>
    }

    const configButton = () => {
        return <div style={{ left: '3vw' }} className={Styles.userProfileButtonDiv}>
            <button onClick={() => handleConfigButtonClick()}
                className={Styles.roundButton}>

                <i className={'fas fa-cog'} />

            </button>
            <label>{'CONFIGURAÇÕES'}</label>
        </div>
    }

    const signOutButton = () => {
        return <div className={Classes({ [Styles.userProfileButtonDiv]: true, [Styles.userProfileButtonCenterDiv]: true })}>
            <button onClick={() => dispatch(Actions.signOut())}
                className={Classes({ [Styles.roundButton]: true, [Styles.roundButtonCenterDiv]: true })}>

                <i className={Classes({ 'fas fa-sign-out-alt': true, [Styles.signOutIcon]: true })} />

            </button>
            <label>{'SAIR'}</label>
        </div>
    }

    const editInfoButton = () => {
        return <div style={{ right: '3vw' }} className={Styles.userProfileButtonDiv}>
            <button onClick={() => handleEditInfoButtonClick()}
                className={Styles.roundButton}>

                <i className={'fas fa-pencil-alt'} />

            </button>
            <label>{'EDITAR INFO'}</label>
        </div>
    }

    const userProfileCircle = () => {
        return <div className={Styles.userProfileCircle}>

            {userPersonalInfo()}

            {configButton()}

            {signOutButton()}

            {editInfoButton()}

        </div>
    }

    return <div className={Styles.container}>

        {userProfileCircle()}

    </div>
}
