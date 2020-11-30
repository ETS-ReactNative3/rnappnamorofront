import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Classes from 'classnames';

import { Carousel } from '../../../utils/StatelessComponents';
import * as Actions from '../../../../actions';
import Styles from './ChatPanel.module.css';

export default () => {

    const dispatch = useDispatch();
    
    const { selectedMatchProfileData } = useSelector(state => state.dashboard);

    const unmatch = () => {
        dispatch(Actions.showGenericYesNoModal(
            true,
            'Desfazer match?',
            'Deseja mesmo desfazer essa match? Você pode não encontrar essa pessoa novamente na busca!',
            'CONTINUAR',
            'CANCELAR',
            'genericYesNoModalUnmatch'
        ));
    }

    const profileInfoDiv = () => {
        return <div className={Styles.profileInfoDiv}>
            <h1 className={Classes({ "h1": true, [Styles.profileName]: true })}>
                {
                    `${selectedMatchProfileData.firstName || ''}`
                }
                <span className={Styles.genericText}>{`, ${selectedMatchProfileData.age || ''}`}</span>
            </h1>
            <label className={Styles.genericText}>
                <i className={'fa fa-map-marker-alt'} />
                {
                    `\na ${selectedMatchProfileData.distance === 0 ?
                        'menos de 1'
                        :
                        selectedMatchProfileData.distance} km daqui`
                }
            </label>
        </div>
    }

    const profileInfoBottomDiv = () => {
        return <div className={Styles.profileInfoBottomDiv}>
            <div className={Styles.unmatchButtonsDiv}>

                <button onClick={() => unmatch()}
                    className={Classes({ [Styles.unmatchButtons]: true, 'fullWidthButton': true })}>
                    <label className={'label'}>DESFAZER MATCH</label>
                </button>

                <button onClick={() => null}
                    className={Classes({ [Styles.unmatchButtons]: true, 'fullWidthButton': true })}>
                    <label className={'label'}>DENUNCIAR</label>
                </button>

            </div>
        </div>
    }

    return (
        <div className={Styles.profilePanel}>

            <div style={{ height: 'calc(100% - 100px - 70px)' }}>
                {selectedMatchProfileData && <Carousel images={selectedMatchProfileData.UserImages} />}
            </div>

            {selectedMatchProfileData && profileInfoDiv()}

            {profileInfoBottomDiv()}

        </div>
    )
}
