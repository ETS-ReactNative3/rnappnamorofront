import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import * as Actions from '../../../actions';
// import Styles from './Dashboard.module.css';
// import LeftElement from './LeftElement';
// import ProfileCard from './ProfileCard';
// import MatchSearcher from './MatchSearcher';
// import ChatPanel from './ChatPanel';
// import MobileDashboard from './MobileDashboard';

export default function Dashboard() {

    // const dispatch = useDispatch();
    // const history = useHistory();

    // const { isAuthenticated } = useSelector(state => state.auth);
    // const { isLeftProfileOpen, isChatPanelOpen } = useSelector(state => state.dashboard);
    // const { isCompleteYourProfileModalOpen } = useSelector(state => state.modal);

    // useEffect(() => {

    //     if (isAuthenticated) {
    //         dispatch(Actions.updateHelperRoute('/dashboard'));
    //         dispatch(Actions.getUserData(true, true, true, true))
    //     }
    //     else
    //         history.push('/');

    // }, [isAuthenticated]);
    // //********************************

    // const mainScreen = () => {
    //     return isLeftProfileOpen ? <ProfileCard /> : isChatPanelOpen ? <ChatPanel /> : <MatchSearcher />
    // }

    // const desktopDashboard = () => {
    //     return <div className={Styles.desktopDashboard}>

    //         <LeftElement shouldRenderLeftElementHeader={true} />

    //         {!isCompleteYourProfileModalOpen && mainScreen()}

    //     </div>
    // }

    // const mobileDashboard = () => {
    //     return <div className={Styles.mobileDashboard}><MobileDashboard /></div>
    // }

    return (
        <>
            {/* {
                isAuthenticated &&
                <div className={Styles.dashboard}>

                    {desktopDashboard()}

                    {mobileDashboard()}

                </div>
            } */}
        </>
    )
}
