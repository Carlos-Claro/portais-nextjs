export const todosParametros = state => state.parametros

export const getSelecionados = (state, item) => {
    if (state.parametros[item]){
        return state.parametros[item]
    }
    return []
}