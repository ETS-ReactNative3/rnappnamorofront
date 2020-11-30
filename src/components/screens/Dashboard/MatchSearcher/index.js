import React from 'react';
import { useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';

import { WeFoundALocationProblem } from '../../../utils/StatelessComponents';
import CoreElements from './CoreElements';
import Styles from './MatchSearcher.module.css';

export default () => {

    const {
        matchSearcherProfiles,
        isSearchingProfiles,
        userData
    } = useSelector(state => state.dashboard);

    const { isGeolocationEnabled } = useSelector(state => state.utils);

    const turnOnShowMeOnApp = () => {
        return <div className={Styles.genericTextContainer}>
            <label className={Styles.searchingProfiles}>
                {' Para continuar, habilite a opção "Mostrar-me no App" no "Meu Perfil".'}
            </label>
        </div>
    }

    const searchingProfiles = () => {
        return <div className={Styles.genericTextContainer}>
            <label className={Styles.searchingProfiles}>
                <i className={'fa fa-map-marker-alt'} />
                {' Buscando perfis...'}
            </label>
        </div>
    }

    const weFoundNobody = () => {
        return <div className={Styles.genericTextContainer}>
            <label className={Styles.genericText}>
                <i className={'fa fa-globe-americas'} />
                {`\nOops, não encontramos ninguém próximo a você. Tente aumentar sua "Distância máxima" ou a "Faixa etária" no "Meu perfil". Boa sorte!!`}
            </label>
        </div>
    }

    const WeFoundALocationProblemDiv = () => {
        return <div className={Styles.profileCard}>
            <WeFoundALocationProblem />
        </div>
    }

    return <Scrollbars autoHide>
        <div className={Styles.mainDiv}>
            {
                !isGeolocationEnabled ? WeFoundALocationProblemDiv()
                    :
                    !userData.showMeOnApp ? turnOnShowMeOnApp()
                        :
                        isSearchingProfiles && matchSearcherProfiles.length === 0 ? searchingProfiles()
                            :
                            matchSearcherProfiles.length === 0 ? weFoundNobody()
                                :
                                <CoreElements />
            }
        </div >
    </Scrollbars>
}
