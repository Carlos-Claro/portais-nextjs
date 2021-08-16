import Parametros from '../../mocks/parametros.json'

export default function (state=Parametros, action){
    switch(action.type) {
        case 'HANDLE_PARAMETROS':
            return {...state, [action.payload.tipo]:action.payload.valor}
        default:
            return state
    }
}