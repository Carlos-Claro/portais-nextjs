const start = {
    url:false,
    imoveis:false,
    qtde:false
}
export default function Carregamento(state=start, action){
    switch(action.type) {
        case 'HANDLE_CARREGAMENTO':
            return {...state, [action.payload.tipo]:action.payload.valor}
        case 'C_SET_URL':
            return {...state, url: ! state.url}
        case 'SET_IMOVEIS':
            return {...state, imoveis: ! state.imoveis}
        case 'SET_QTDE':
            return {...state, qtde: ! state.qtde}
        default:
            return state
    }
}