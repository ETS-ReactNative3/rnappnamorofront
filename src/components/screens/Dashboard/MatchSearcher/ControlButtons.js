import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from '../../../../actions';
import Styles from './MatchSearcher.module.css';

export default () => {

    const dispatch = useDispatch();

    const {
        matchSearcherProfiles,
        userData
    } = useSelector(state => state.dashboard);

    const [isSuperLikeAvailable, setIsSuperLikeAvailable] = useState(false);

    const ignoreCurrentProfile = () => {
        dispatch(Actions.ignoreCurrentProfile(matchSearcherProfiles[0]));
    }

    const likeCurrentProfile = (superLike) => {
        setIsSuperLikeAvailable(!superLike);
        dispatch(Actions.likeCurrentProfile(matchSearcherProfiles[0], superLike));
    }

    useEffect(() => {
        setIsSuperLikeAvailable(checkIfSuperLikeIsAvailable());
    }, [userData.lastTimeSuperLikeWasUsed]);

    const checkIfSuperLikeIsAvailable = () => {
        var timeStart = new Date(userData.lastTimeSuperLikeWasUsed).getTime();
        var timeEnd = new Date().getTime();
        var hourDiff = timeEnd - timeStart; //in ms
        var hDiff = hourDiff / 3600 / 1000; //in hours
        var humanReadable = {};
        humanReadable.hours = Math.floor(hDiff);

        return humanReadable.hours > 24
    }

    const controlButtons = () => {
        return <div className={Styles.controlButtonsDiv}>
            <div className={Styles.buttonDiv}>
                <button className={Styles.controlButton}
                    type="button"
                    onClick={() => ignoreCurrentProfile()}>
                    <i style={{ color: '#fe486c', fontSize: '40px' }} className={'fa fa-times'}></i>
                </button>
            </div>

            <div className={Styles.buttonDiv}>
                <button className={Styles.controlButton}
                    type="button"
                    style={{ height: '60px', width: '60px' }}
                    onClick={() => isSuperLikeAvailable && likeCurrentProfile(true)}>
                    <i className={'fa fa-star'}
                        style={{
                            color: isSuperLikeAvailable ? '#30afff' : '#c0c0c0',
                            fontSize: '25px'
                        }}
                    />
                </button>
            </div>

            <div className={Styles.buttonDiv}>
                <button className={Styles.controlButton}
                    type="button"
                    onClick={() => likeCurrentProfile()}>
                    <i style={{ color: '#0be08f' }} className={'fa fa-heart'}></i>
                </button>
            </div>
        </div>
    }

    return (
        <>
            {controlButtons()}
        </>
    )
}
