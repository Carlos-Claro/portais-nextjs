export default function Favorito(state=[], action){
    switch(action.type) {
        case 'HANDLE_FAVORITO':
            if (state.indexOf(action.payload) === -1){
                return [...state, action.payload]
            }else{
                const fav = state.slice()
                fav.splice(state.indexOf(action.payload),1)
                return fav
            }
        default:
            return state
    }
}