import Headinit from '../../mocks/head.json'

export default function Head(state=Headinit, action){
    switch(action.type) {
        case 'SET':
            return action.payload
        case 'SET_TIPO':
            return {...state, [action.payload.tipo]:action.payload.valor}
        case 'UNSET':
            return Headinit
        default:
            return state
    }
}