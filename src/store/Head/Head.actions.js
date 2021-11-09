
export function setHead (valor) {
    return {
        type:'SET',
        payload: valor
    }
}

export function setHeadQtde (valor) {
    return {
        type:'SET_TIPO',
        payload: {tipo:'qtde_total', valor:valor}
    }
}


export function setHeadTitle (valor) {
    return {
        type:'SET_TIPO',
        payload: {tipo:'title', valor:valor}
    }
}


export function setHeadDescription (valor) {
    return {
        type:'SET_TIPO',
        payload: {tipo:'description', valor:valor}
    }
}

export function unsetHead (chave){
    return {
        type:'UNSET',
        payload:chave
    }
}
