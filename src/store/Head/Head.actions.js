
export function setHead (valor) {
    return {
        type:'SET',
        payload: {tipo:tipo, valor:valor}
    }
}

export function unsetHead (chave){
    return {
        type:'UNSET',
        payload:chave
    }
}
