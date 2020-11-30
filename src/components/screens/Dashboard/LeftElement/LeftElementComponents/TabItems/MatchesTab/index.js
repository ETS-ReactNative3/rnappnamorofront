import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Classes from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

import * as Actions from '../../../../../../../actions';
import noProfile from '../../../../../../../assets/noProfile.png';
import Styles from './MatchesTab.module.css';

export default () => {

    const dispatch = useDispatch();

    const { matchProfiles } = useSelector(state => state.dashboard);

    const maxTextButtonLength = 11;

    const renderMatchProfiles = () => {

        const profiles = [];

        for (let i = 0; i <= matchProfiles.length - 1; i += 3) {

            profiles.push(
                <div key={i} className={Styles.matchDiv}>
                    {render3ProfileButtons([matchProfiles[i], matchProfiles[i + 1], matchProfiles[i + 2]])}
                </div>
            );
        }

        return profiles;
    }

    const handleMatchProfileClick = (item) => {
        dispatch(Actions.setSelectedMatchProfileDataAndOpenChatPanel(item, true));
    }

    const render3ProfileButtons = (matchProfiles) => {

        const renderedProfileButtons = [];

        for (let i = 0; i <= 2; i++) {

            renderedProfileButtons.push(
                matchProfiles[i] &&
                <button key={i}
                    onClick={() => handleMatchProfileClick(matchProfiles[i])}
                    className={Classes({ [Styles.profileButton]: true, "fullWidthButton": true })}>
                    {
                        matchProfiles[i].UserImages[0] ?
                            <img src={matchProfiles[i].UserImages[0].imageUrl} />
                            :
                            <img style={{ backgroundSize: 'contain' }}
                                src={noProfile}
                            />
                    }
                    <label>
                        {
                            matchProfiles[i].firstName.length > maxTextButtonLength ?
                                matchProfiles[i].firstName.substring(0, maxTextButtonLength) + '...' :
                                matchProfiles[i].firstName
                        }
                    </label>
                </button>
            );
        }

        return renderedProfileButtons;
    }

    const youHaveNoMatchesDiv = () => {
        return <div className={Styles.youHaveNoMatchesDiv}>
            <label>{'Você ainda não possui nenhuma match. Dê like nas pessoas e se elas derem like em você será criada uma match aqui. :)'}</label>
        </div>
    }

    return (
        <div className={Styles.mainDiv}>

            <Scrollbars autoHide>

                {matchProfiles.length > 0 ? renderMatchProfiles() : youHaveNoMatchesDiv()}

            </Scrollbars>
            
        </div >
    )
}
