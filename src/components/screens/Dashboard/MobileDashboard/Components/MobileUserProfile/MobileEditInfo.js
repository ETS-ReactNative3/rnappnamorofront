import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from '../../../../../../actions';
import { GenericHeader, GenericDoubleBottomButton } from '../../../../../utils/StatelessComponents';
import ProfileCardEditMode from '../../../ProfileCard/ProfileCardEditMode';
import { handleError } from '../../../../../utils/Functions';
import Styles from '../../MobileDashboard.module.css';

export default () => {

    const dispatch = useDispatch();

    const { userData } = useSelector(state => state.dashboard);

    const handleBackButton = () => {
        dispatch(Actions.showProfileCardEditMode(false));
        dispatch(Actions.openMobileEditInfo(false));
    }

    const updateuserData = async () => {
        try {
            const updatedUserData = {
                about: userData.about,
                birthday: userData.birthday,
                gender: userData.gender.key,
                schooling: userData.schooling.key,
                company: userData.company,
                position: userData.position
            }

            dispatch(Actions.updateUser(updatedUserData, false, null));
            dispatch(Actions.showProfileCardEditMode(false));
            dispatch(Actions.openMobileEditInfo(false));
        } catch (err) {
            handleError(err);
        }
    }

    return <div className={Styles.container}>

        <GenericHeader title={'Editar Info'} onClick={() => handleBackButton()} />

        <ProfileCardEditMode />

        <GenericDoubleBottomButton
            button1Type={'button'}
            button2Type={'button'}
            button1Click={() => handleBackButton()}
            button2Click={() => updateuserData()}
            button1Text={'VOLTAR'}
            button2Text={'SALVAR'}
        />

    </div>
}
