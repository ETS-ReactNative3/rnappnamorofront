import React from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import Styles from './LeftProfile.module.css';
import EmailEditor from '../LeftElementComponents/EmailEditor';
import PhoneEditor from '../LeftElementComponents/PhoneEditor';
import SearchingByEditor from '../LeftElementComponents/SearchingByEditor';
import LocationEditor from '../LeftElementComponents/LocationEditor';

export default () => {

    const { selectedLeftProfileEditor } = useSelector(state => state.dashboard);

    const verifySelectedLeftProfileEditor = () => {
        switch (selectedLeftProfileEditor) {
            case "email":
                return <EmailEditor />
            case "phone":
                return <PhoneEditor />
            case "searchingBy":
                return <SearchingByEditor />
            case "location":
                return <LocationEditor />
            default:
                return null;
        }
    }

    return <Scrollbars autoHide>
        <div className={Styles.container}>

            {verifySelectedLeftProfileEditor()}

        </div>
    </Scrollbars>
}
