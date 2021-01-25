import { useContext, useEffect } from 'react'
import { UiContext } from '../context/UiContext';

const useHideMenu = (ocultar) => {

    const {showMenu, hidenMenu} = useContext(UiContext);

    useEffect(() => {
        if (ocultar) {
            hidenMenu();
        } else {
            showMenu();
        }
    }, [ocultar, hidenMenu, showMenu]);

}

export default useHideMenu
