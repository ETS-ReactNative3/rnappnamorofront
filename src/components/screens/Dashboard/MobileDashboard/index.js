import React from 'react';
import { useSelector } from 'react-redux';

import { TabNavigator } from '../../../utils/StatelessComponents';
import MatchSearcher from '../MatchSearcher';
import Styles from './MobileDashboard.module.css'
import MobileUserProfile from './Components/MobileUserProfile';
import MessagesTabAndMatchesTabMerge from './Components/MessagesTabAndMatchesTabMerge';
import ChatPanel from '../ChatPanel/CoreElements';
import MobileConfig from './Components/MobileUserProfile/MobileConfig';
import MobileEditInfo from './Components/MobileUserProfile/MobileEditInfo';

export default () => {

    const { isChatPanelOpen, isMobileConfigOpen, isMobileEditInfoOpen } = useSelector(state => state.dashboard);

    const mobileDashboard = () => {
        return <TabNavigator
            indicatorColor={'transparent'}
            tabItems={[
                <MatchSearcher />,
                <MessagesTabAndMatchesTabMerge />,
                <MobileUserProfile />
            ]}
            tabTitles={[
                { icon: 'fas fa-heart', label: '' },
                { icon: 'fas fa-comments', label: '' },
                { icon: 'fas fa-user-alt', label: '' }
            ]}
        />
    }

    return <div className={Styles.container}>
        {
            isChatPanelOpen ?
                <ChatPanel />
                : isMobileConfigOpen ?
                    <MobileConfig />
                    : isMobileEditInfoOpen ?
                        <MobileEditInfo />
                        : mobileDashboard()
        }
    </div>
}
