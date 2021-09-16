export function carregamentoSetUrl() {
    return {
        type:'C_SET_URL',
        payload: true
    }
}
export function setImoveis(){
    return {
        type:'SET_IMOVEIS',
        payload: true
    }
}
export function setQtde(){
    return {
        type: 'SET_QTDE',
        payload:true
    }
}
export function setToken(token){
    return {
        type: 'SET_TOKEN',
        payload:token
    }
}
