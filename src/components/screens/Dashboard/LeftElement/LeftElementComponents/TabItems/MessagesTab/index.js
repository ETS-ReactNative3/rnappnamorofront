import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Classes from 'classnames';
import Scrollbars from 'react-custom-scrollbars';

import noProfile from '../../../../../../../assets/noProfile.png';
import * as Actions from '../../../../../../../actions';
import Styles from './MessagesTab.module.css';

export default () => {

    const dispatch = useDispatch();

    const {
        matchProfiles,
        selectedMatchProfileData,
        realTimeFirebaseChat
    } = useSelector(state => state.dashboard);

    const { userData } = useSelector(state => state.dashboard);

    const maxTextButtonLength = 27;

    const filterContactsAndRender = () => {

        const contactIdsThatAlreadyTalkedWithUser = [];

        realTimeFirebaseChat.filter(item => {

            !contactIdsThatAlreadyTalkedWithUser.includes(item.userId_1) && item.userId_1 != userData.id ?
                contactIdsThatAlreadyTalkedWithUser.push(item.userId_1)
                :
                !contactIdsThatAlreadyTalkedWithUser.includes(item.userId_2) && item.userId_2 != userData.id &&
                contactIdsThatAlreadyTalkedWithUser.push(item.userId_2)

        });

        //filter only contacts that already talked with current user
        const contactsAlreadyTalked = matchProfiles.filter((item) =>
            contactIdsThatAlreadyTalkedWithUser.includes(item.id) && item);

        //add last message into each contact object to be showed on contact items on Message's tab (dashboard)
        contactsAlreadyTalked.map(contact => {

            //gets only messages from current contact
            let realTimeFirebaseChatFiltered = realTimeFirebaseChat.filter(message => message.userId_1 == contact.id || message.userId_2 == contact.id);

            //order by date
            realTimeFirebaseChatFiltered = realTimeFirebaseChatFiltered.sort((a, b) => b.createdAt.toString() - a.createdAt.toString());

            //gets the last maessage from their talk
            contact.lastMessage = realTimeFirebaseChatFiltered[0].message;
        });

        //console.log(contactsAlreadyTalked);
        //now order the items based on the last message date and time, last message first
        const helper = [];
        contactIdsThatAlreadyTalkedWithUser.forEach(el => helper.push(contactsAlreadyTalked.find(e => e.id == el)));

        return renderContacts(helper);
    }

    const renderContacts = (helper) => {
        return helper.map((item, index) =>

            <button key={index}
                onClick={() => dispatch(Actions.setSelectedMatchProfileDataAndOpenChatPanel(item, true))}
                className={
                    Classes({
                        [Styles.contactButton]: true,
                        "fullWidthButton": true,
                        [Styles.contactButtonSelected]: selectedMatchProfileData && selectedMatchProfileData.id == item.id
                    })}>
                {
                    item.UserImages.length > 0 && item.UserImages[0] ?
                        <img src={item.UserImages[0].imageUrl} />
                        :
                        <img style={{ backgroundSize: 'contain' }}
                            src={noProfile}
                        />
                }
                <div className={Styles.textDiv}>
                    <p>
                        {
                            item.firstName.length > maxTextButtonLength ?
                                item.firstName.substring(0, maxTextButtonLength) + '...' :
                                item.firstName
                        }
                    </p>

                    <label>
                        {
                            item.lastMessage && item.lastMessage.length > maxTextButtonLength ?
                                item.lastMessage.substring(0, maxTextButtonLength) + '...' :
                                item.lastMessage
                        }
                    </label>
                </div>

                {/*the following code is about the green circle that shows if contact is
                online or not, commented cause I'm not going to use it atm
                 <div className={Styles.statusDiv}>
                    <div>
                        <i className={'fa fa-circle'} />
                    </div>
                </div> */}
            </button>
        );
    }

    const youHaveNoConversationDiv = () => {
        return <div className={Styles.youHaveNoConversationDiv}>
            <label>{'Você ainda não iniciou nenhuma conversa'}</label>
        </div>
    }

    return (
        <div className={Styles.mainDiv}>

            <Scrollbars autoHide>

                {realTimeFirebaseChat.length > 0 && matchProfiles.length > 0 ? filterContactsAndRender() : youHaveNoConversationDiv()}

            </Scrollbars>

        </div >
    )
}
