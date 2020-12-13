import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';

//import CoreElements from './CoreElements';

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
        return <div className={Styles.weFoundALocationProblem}>
            <h2 className="h2">Encontramos um probleminha!</h2>

            <Separator text={null} />

            <p className="p">
                Para usar o App Namoro você precisa ativar o Compartilhamento de Localização.
                Acesse as configurações do seu navegador.
            </p>
        </div>
    }

    return <ScrollView>
        {/* {
            !isGeolocationEnabled ? WeFoundALocationProblemDiv()
                :
                !userData.showMeOnApp ? turnOnShowMeOnApp()
                    :
                    isSearchingProfiles && matchSearcherProfiles.length === 0 ? searchingProfiles()
                        :
                        matchSearcherProfiles.length === 0 ? weFoundNobody()
                            :
                            <CoreElements />
        } */}
    </ScrollView>
}
