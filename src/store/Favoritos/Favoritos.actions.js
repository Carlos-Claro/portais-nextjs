export function handle (id, token) {
    return {
        type:'HANDLE_FAVORITO',
        payload: {id:id, token: token}
    }
}