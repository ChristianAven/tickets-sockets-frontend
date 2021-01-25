import React, { createContext, useState }  from 'react'

export const UiContext = createContext();

const UiProvider = ({ children }) => {

    const [ocultarMenu, setOcultarMenu] = useState(false);

    const showMenu = () => {
        setOcultarMenu(false);
    }

    const hidenMenu = () => {
        setOcultarMenu(true);
    }

    return (
        <UiContext.Provider value={{ ocultarMenu, showMenu, hidenMenu}}>
            {children}
        </UiContext.Provider>
    )
}

export default UiProvider
