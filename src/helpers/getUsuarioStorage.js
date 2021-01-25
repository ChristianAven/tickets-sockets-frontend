export const getUsuarioStorage = () => {
    return {
        agente: localStorage.getItem('nombre') || null,
        escritorio: localStorage.getItem('escritorio') || null,
    }
}