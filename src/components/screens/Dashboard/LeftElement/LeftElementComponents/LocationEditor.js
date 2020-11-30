import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    SubtitleLeftElement,
    WeFoundALocationProblem
} from '../../../../utils/StatelessComponents';
import * as Actions from '../../../../../actions';
import Classes from 'classnames';
import Styles from './LeftElementComponents.module.css';

export default () => {

    const dispatch = useDispatch();
    const { address } = useSelector(state => state.dashboard);
    const { isGeolocationEnabled } = useSelector(state => state.utils);

    useEffect(() => {
        dispatch(Actions.getAddress());
    }, []);

    const myLocationDiv = () => {
        return <div className={Classes({ "fullWidthButton": true, [Styles.myLocationDiv]: true })}>
            <i className={'fa fa-map-marker-alt'}></i>

            <div style={{ marginLeft: '10px' }}>
                <h3 ellipsizeMode='head' className={Classes({ "h3": true, [Styles.myLocationDivH3Top]: true })}>
                    {'Minha Localização atual.'}
                </h3>
                <h3 ellipsizeMode='head' className={Classes({ "h3": true, [Styles.myLocationDivH3Bottom]: true })}>
                    {address}
                </h3>
            </div>
        </div>
    }

    return (
        <div className={Styles.container}>

            <SubtitleLeftElement title="LOCALIZAÇÃO" />

            {myLocationDiv()}

            {!isGeolocationEnabled && <WeFoundALocationProblem />}
        </div >
    )
}
