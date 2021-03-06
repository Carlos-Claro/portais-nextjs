const start = {
    url:false,
    imoveis:false,
    qtde:false,
    token:false,
    imobiliarias:false,
    chat:false
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
        case 'SET_TOKEN':
            return {...state, imoveis: ! state.imoveis, token: action.payload}
        case 'SET_IMOBILIARIAS':
            return {...state, imobiliarias: ! state.imobiliarias}
        case 'SET_CHAT':
            return {...state, chat: ! state.chat}
        default:
            return state
    }
}