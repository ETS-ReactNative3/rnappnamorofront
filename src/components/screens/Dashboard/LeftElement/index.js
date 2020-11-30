import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Classes from 'classnames';

import * as Actions from '../../../../actions';
import Styles from './LeftElement.module.css';
import LeftProfile from './LeftProfile';
import LeftProfileEditor from './LeftProfile/LeftProfileEditor';
import MatchesTab from './LeftElementComponents/TabItems/MatchesTab';
import MessagesTab from './LeftElementComponents/TabItems/MessagesTab';
import { TabNavigator } from '../../../utils/StatelessComponents';
import noProfile from '../../../../assets/noProfile.png';

export default (props) => {

    const dispatch = useDispatch();

    const {
        isLeftProfileOpen,
        isLeftProfileEditorOpen,
        userData,
    } = useSelector(state => state.dashboard);

    const [shouldRenderLeftProfile, setShouldRenderLeftProfile] = useState(isLeftProfileOpen);
    const [shouldRenderLeftProfileEditor, setShouldRenderLeftProfileEditor] = useState(isLeftProfileEditorOpen);

    const showLeftProfile = (show) => {
        dispatch(Actions.openChatPanel(false));
        dispatch(Actions.showProfileCardEditMode(false));
        dispatch(Actions.showLeftProfile(show));
    };

    useEffect(() => {
        if (isLeftProfileOpen)
            setShouldRenderLeftProfile(isLeftProfileOpen);
    }, [isLeftProfileOpen]);

    useEffect(() => {
        if (isLeftProfileEditorOpen)
            setShouldRenderLeftProfileEditor(isLeftProfileEditorOpen);
    }, [isLeftProfileEditorOpen]);

    const onAnimationProfileEnd = () => {
        if (!isLeftProfileOpen)
            setShouldRenderLeftProfile(false);
    };

    const onAnimationLeftProfileEditorEnd = () => {
        if (!isLeftProfileEditorOpen)
            setShouldRenderLeftProfileEditor(false);
    };

    const handleBackButton = () => {
        if (isLeftProfileEditorOpen)
            dispatch(Actions.showLeftProfileEditor(false));
        else if (isLeftProfileOpen)
            showLeftProfile(false);
    }

    const leftElementHeader = () => {
        return <div className={Styles.leftElementHeader}>
            {
                shouldRenderLeftProfile &&
                <button
                    className={Classes({ [Styles.arrowLeftButton]: true, "fullWidthButton": true })}
                    style={{ animation: `${isLeftProfileOpen ? Styles.showArrowLeftButton : Styles.hideArrowLeftButton} 0.3s` }}
                    onClick={handleBackButton}
                >
                    <i className={Classes({ "fa fa-angle-left": true, [Styles.i]: true })}></i>
                </button>
            }

            <button onClick={() => showLeftProfile(true)} className={Classes({ [Styles.myProfileButton]: true, "fullWidthButton": true })}>
                {
                    userData.UserImages && userData.UserImages.length > 0 ?
                        <img
                            className={Styles.profileImageIcon}
                            src={userData.UserImages[0].imageUrl}
                        />
                        :
                        <img
                            className={Styles.profileImageIcon}
                            style={{ backgroundSize: 'contain' }}
                            src={noProfile}
                        />
                }

                <p style={{ fontSize: '20px' }}>{'Meu perfil'}</p>
            </button>
        </div>
    }

    const leftElementContent = () => {
        return <div className={Styles.leftContent}>
            {
                shouldRenderLeftProfileEditor ?
                    <div className={Styles.profile}
                        style={{ animation: `${isLeftProfileEditorOpen ? Styles.showLeftProfileEditor : Styles.hideLeftProfileEditor} 0.3s` }}
                        onAnimationEnd={onAnimationLeftProfileEditorEnd}>
                        <LeftProfileEditor />
                    </div>
                    :
                    shouldRenderLeftProfile ?
                        <div className={Styles.profile}
                            style={{ animation: `${isLeftProfileOpen ? Styles.showLeftProfile : Styles.hideLeftProfile} 0.3s` }}
                            onAnimationEnd={onAnimationProfileEnd}>
                            <LeftProfile />
                        </div>
                        :
                        <div className={Styles.profile}>
                            <TabNavigator
                                indicatorColor={'var(--primaryColor)'}
                                tabItems={[<MatchesTab />, <MessagesTab />]}
                                tabTitles={[
                                    { icon: '', label: 'Matches' },
                                    { icon: '', label: 'Mensagens' }
                                ]}
                            />
                        </div>
            }
        </div>
    }

    return (
        <div style={{ width: props.isMobile ? '100%' : 'var(--dashboardLeftElementWidth)' }} className={Styles.container}>

            {props.shouldRenderLeftElementHeader && leftElementHeader()}

            {leftElementContent()}

        </div>
    )
}
