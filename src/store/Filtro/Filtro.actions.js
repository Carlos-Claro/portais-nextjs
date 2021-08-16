export function handleFiltro (tipo, valor) {
    return {
        type:'HANDLE_PARAMETROS',
        payload: {tipo:tipo, valor:valor}
    }
}