
export function handleFiltro (tipo, valor) {
    return {
        type:'HANDLE_PARAMETROS',
        payload: {tipo:tipo, valor:valor}
    }
}

export function limpaFiltro (chave){
    return {
        type:'LIMPA_PARAMETROS',
        payload:chave
    }
}

export function setURL(url){
    return {
        type:'SET_URL',
        payload:url
    }

}

export function unsetParametros(){
    return {
        type:'UNSET_PARAMETROS',
        payload: true
    }
}

export function setParametros(parametros){
    return {
        type:'SET_PARAMETROS',
        payload:parametros
    }
}