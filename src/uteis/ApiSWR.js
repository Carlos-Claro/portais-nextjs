import useSWR from "swr";

const endereco = "http://carlosclaro.ddns.net:5000/";

const token = ''

const requestInfoGet = (token) => { return {
    method:'GET',
    headers: new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
        })
}}
const fetcher = (token, cidade) => fetch(`${endereco}portal_empresas?cidade_link=${cidade}`, requestInfoGet(token)).then(res => res.json())

export function useImobiliarias(token, cidade) {
    const {data, error} = useSWR(`api/empresas/${cidade}`, fetcher(token, cidade))
    console.log(data, error);
    return {
    user: data,
    isLoading: !error && !data,
    isError: error
    }
}