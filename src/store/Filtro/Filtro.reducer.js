import Parametros from '../../mocks/parametros.json'

export default function Filtro(state=Parametros, action){
    switch(action.type) {
        case 'HANDLE_PARAMETROS':
            return {...state, [action.payload.tipo]:action.payload.valor}
        case 'LIMPA_PARAMETROS':
            let sta = state;
            delete sta[action.payload]
            return sta
        case 'SET_URL':
            return {url:action.payload}
        case 'SET_PARAMETROS':
            return action.payload
        default:
            return state
    }
}