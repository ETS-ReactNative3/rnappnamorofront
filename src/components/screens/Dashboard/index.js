import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../../../assets/logo.png';
import { AppLogo } from '../../commonComponents';
import * as Actions from '../../../actions';
import { decodeJwtToken } from '../../utils/Functions';

// import * as Actions from '../../../actions';
// import Styles from './Dashboard.module.css';
// import LeftElement from './LeftElement';
// import ProfileCard from './ProfileCard';
// import MatchSearcher from './MatchSearcher';
// import ChatPanel from './ChatPanel';
// import MobileDashboard from './MobileDashboard';

export default function Dashboard(props) {

    const dispatch = useDispatch();
    // const history = useHistory();

    const { isAuthenticated } = useSelector(state => state.auth);
    const { userData } = useSelector(state => state.dashboard);
    // const { isLeftProfileOpen, isChatPanelOpen } = useSelector(state => state.dashboard);
    // const { isCompleteYourProfileModalOpen } = useSelector(state => state.modal);

    useEffect(() => {
        // if (isAuthenticated)
        //     dispatch(Actions.getUserData(true, true, true, true))
        // else
        //     history.push('/');

    }, [isAuthenticated]);

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

    useEffect(() => {
        handleAccessToken();
    }, []);

    const handleAccessToken = async () => {

        const accessToken = await AsyncStorage.getItem('accessToken');

        //needs the id to be used when download data from resource server:
        dispatch(Actions.updateUserDataOnRedux({ ...userData, id: decodeJwtToken(accessToken).id }));
        dispatch(Actions.updateAccessTokenOnRedux(accessToken));
        dispatch(Actions.checkIfTokenHasExpired());
    }

    useEffect(() => {
        !isAuthenticated && props.navigation.push('Home');
    }, [isAuthenticated]);


    return (
        <>
            <AppLogo source={logo} />
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
