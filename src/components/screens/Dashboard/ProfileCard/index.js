import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Classes from 'classnames';

import * as Actions from '../../../../actions';
import Scrollbars from 'react-custom-scrollbars';
import { IconLabel } from '../../../utils/StatelessComponents';
import { handleError } from '../../../utils/Functions';
import { Carousel, GenericDoubleBottomButton, GenericBottomButton } from '../../../utils/StatelessComponents';
import ProfileCardEditMode from './ProfileCardEditMode';
import Styles from './ProfileCard.module.css';

export default () => {

    const dispatch = useDispatch();

    const { firstName, lastName, age, position, schoolingDesc } = useSelector(state => state.dashboard.userData);
    const { userData, address, isProfileCardEditModeOpen } = useSelector(state => state.dashboard);

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
        } catch (err) {
            handleError(err);
        }
    }

    const showProfileCardEditMode = (show) => {
        dispatch(Actions.getUserData());//get fresh data
        dispatch(Actions.showProfileCardEditMode(show));
    }

    const backSaveButtonsDiv = () => {
        return <GenericDoubleBottomButton
            button1Type={'button'}
            button2Type={'button'}
            button1Click={() => showProfileCardEditMode(false)}
            button2Click={() => updateuserData()}
            button1Text={'VOLTAR'}
            button2Text={'SALVAR'}
        />
    }

    const editarInfoButton = () => {
        return <GenericBottomButton
            onClick={() => showProfileCardEditMode(true)}
            buttonText={'Editar Info'}
        />
    }

    const userImagesDiv = () => {
        return <Scrollbars autoHide>

            <div className={Styles.profileMediaDiv}>
                {userData.UserImages && <Carousel images={userData.UserImages} />}
            </div>

            <div className={Styles.userName}>
                <h1 className="h1">{`${firstName || ''} ${lastName || ''}`}
                    <span className={Styles.userAge}>{`, ${age || ''}`}</span>
                </h1>
 
                <IconLabel iconClass="fa fa-briefcase" text={position} />

                <IconLabel iconClass="fa fa-graduation-cap" text={schoolingDesc} />

                <IconLabel iconClass="fa fa-home" text={address} />
            </div>
        </Scrollbars>
    }

    return (
        <div className={Styles.profileCard}>
            <form className={Classes({ [Styles.form]: true, "form": true })}>

                {isProfileCardEditModeOpen ? <ProfileCardEditMode /> : userImagesDiv()}

                {isProfileCardEditModeOpen ? backSaveButtonsDiv() : editarInfoButton()}

            </form>
        </div >
    )
}
