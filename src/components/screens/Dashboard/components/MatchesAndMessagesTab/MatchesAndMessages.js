import React from 'react';

import MessagesTab from '../../LeftElement/LeftElementComponents/TabItems/MessagesTab';
import MatchesTab from '../../LeftElement/LeftElementComponents/TabItems/MatchesTab';

export default () => {

    return <div className={Styles.MessagesTabAndMatchesTabMerge}>

        <label>{'Suas Matches'}</label>

        <div style={{ flex: 1 }}> <MatchesTab /> </div>

        <label>{'Mensagens'}</label>

        <div style={{ flex: 3 }}> <MessagesTab /> </div>
    </div>
}
