import ApiService from "../../uteis/ApiService"

export default function Favorito(state=[], action){
    switch(action.type) {
        case 'HANDLE_FAVORITO':
            if (state.indexOf(action.payload.id) === -1){
                const item = new ApiService(action.payload.token)
                item.RegistraLog(action.payload.id, 'favorito').then((res) => {})
                return [...state, action.payload.id]
            }else{
                const fav = state.slice()
                fav.splice(state.indexOf(action.payload.id),1)
                return fav
            }
        default:
            return state
    }
}