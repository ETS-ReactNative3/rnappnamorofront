import React from 'react';
import { useSelector } from 'react-redux';
import Classes from 'classnames';

import { Carousel } from '../../../utils/StatelessComponents';
import ControlButtons from './ControlButtons';
import Styles from './MatchSearcher.module.css';

export default () => {

    const { matchSearcherProfiles } = useSelector(state => state.dashboard);

    const profileCard = () => {

        return <div className={Styles.profileCard}>

            {matchSearcherProfiles.length > 0 && <Carousel images={matchSearcherProfiles[0].UserImages} />}

            {
                matchSearcherProfiles[0] &&
                <div className={Styles.userTextInfoDiv}>
                    {
                        matchSearcherProfiles[0].UserMatch[0] && matchSearcherProfiles[0].UserMatch[0].proposerUserUsedSuperLike === 1 &&
                        <i className={Classes({ [Styles.superLike]: true, 'fa fa-star': true })} />
                    }

                    <h1 style={{ lineHeight: 1 }} className="h1">
                        {
                            `${matchSearcherProfiles[0].firstName || ''} ${matchSearcherProfiles[0].lastName || ''}`
                        }
                        <span className={Styles.genericText}>{`, ${matchSearcherProfiles[0].age || ''}`}</span>
                    </h1>

                    <label className={Styles.genericText}>
                        <i className={'fa fa-map-marker-alt'} />
                        {
                            `\na ${matchSearcherProfiles[0].distance === 0 ?
                                'menos de 1'
                                :
                                matchSearcherProfiles[0].distance} km daqui`
                        }
                    </label>

                </div>
            }
        </div>
    }

    return (
        <div className={Styles.coreElementsDiv}>

            {profileCard()}

            <ControlButtons />

        </div>
    )
}
