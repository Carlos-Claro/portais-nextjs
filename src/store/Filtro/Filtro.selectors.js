export const todosParametros = state => state.parametros

export const getSelecionados = (state, item) => {
    return state.parametros[item]
}