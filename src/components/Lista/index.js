import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ApiService from "../../uteis/ApiService";

import { useDispatch, useSelector } from "react-redux";

import { setParametros } from "../../store/Filtro/Filtro.actions";

import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';

import { useRouter } from "next/router";
import { CircularProgress, IconButton, Paper, Typography } from "@material-ui/core"
 



import ImovelLista from "../Imoveis/imovelLista"; 
import { setHeadDescription, setHeadQtde, setHeadTitle } from "../../store/Head/Head.actions";
import Loading from "../Loading";

    const TypographyH1 = styled.h1`
        padding-top: 70px;
        color: blue;
        font-weight: 600;
        font-size: 1em;
        &:hover {
        }
    `;
    const TypographyH2 = styled.h2`
    padding-top: 10px;
    font-size: 1em;
    font-weight: 500;
    color: red;
    &:hover {
    }
    `;

export default function Lista(){   
    // inicia manipuladores
    const dispatch = useDispatch()
    const router = useRouter()
    // inicia variaveis     
    const parametros = useSelector(state => state.parametros)
    const carregamento = useSelector(state => state.carregamento)
    const [qtdeItensporPagina, setQtdeItensporPagina] = React.useState(3)
    const infoPagina = useSelector(state => state.head)
    const [imoveis, setImoveis] = React.useState([])
    const [paginaAtual, setPaginaAtual] = React.useState(0);
    const retornaParametrosURL = () => {
        var pesquisa = Object.keys(parametros).map((chave,i) => parametros[chave] != '' ? (i ? '&' : '' ) + chave + '=' + parametros[chave] : '' ).join('')
        pesquisa += '&limit=' + qtdeItensporPagina + '&skip=' + ( paginaAtual * qtdeItensporPagina )
        return pesquisa
    };
    // prototipo nao encontrei, nao utilizado ainda... todo
    const [openNaoEncontrei, setOpenNaoEncontrei] = React.useState(false)
    const handleOpenNaoencontrei = (acao) => setOpenNaoEncontrei(acao)
    // ativa fim da lista
    const [fimDaLista, setFimDaLista] = React.useState(false)
    const valorFimDalista = () => {
        if (fimDaLista){
            return (
               <>
                   <Typography variant="overline">
                       Esta lista acabou!!! 
                       <br />
                       O que fazer agora?
                   </Typography>
                   <br />
                   <IconButton variant="outline" href="/encontre">
                       <HelpTwoToneIcon fontSize="large" color="info" />
                   </IconButton>
                </>
           )
        } else{
            return (<Loading titulo="Carregando mais imóveis" />)
        }
    }


    /**
     * Carga de imóveis, altera quando paginaAtual ou parametros são altertados, e na primeira carga
     */
    React.useEffect(() => {
        if ( carregamento.token ){
            // carrega api
            const item = new ApiService(carregamento.token)
            item.tituloQtdeImoveis(retornaParametrosURL()).then((res) => {
                dispatch(setHeadQtde(res.qtde_total))
                dispatch(setHeadTitle(res.titulo))
                dispatch(setHeadDescription(res.descricao))
                if ( res.itens.length ){
                    if ( paginaAtual == 0 ){
                        setImoveis(res.itens)
                        /** retorna itens na url, desativado no desenvolvimento para evitar refresh da pasta .next o tempo todo */
                        if ( ! router.query['url'] || (router.query['url'] && router.query['url'][0] !== res.uri)){
                            router.push({
                                pathname: '/[...url]',
                                query: { url: [res.uri] }
                            }, 
                            undefined, { shallow: true }
                            )
                        }
                    }else{
                        setImoveis((itensAtual) => [...itensAtual,...res.itens])  
                    }
                    let retornoParametros = res.parametros
                    if ( parametros['url'] ){
                        if ( ! retornoParametros['tipo_negocio'] ){
                            retornoParametros['tipo_negocio'] = "venda"
                        }
                        if ( ! retornoParametros['bairros_link'] ){
                            retornoParametros['bairros_link'] = []
                        }
                        if ( ! retornoParametros['imoveis_tipos_link'] ){
                            retornoParametros['imoveis_tipos_link'] = []
                        }
                        dispatch(setParametros(retornoParametros))
                    }
                }else{
                    setFimDaLista(true)
                }
                
            });
        }
    }, [paginaAtual, carregamento.imoveis])
    /**
     * verifica fim da pagina, paginação
     */
    React.useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            if ( entries.some(entry => entry.isIntersecting) ){
                let imovelClass = document.querySelectorAll(".imovel")
             
                if ( imovelClass.length > 0  ){
                    setPaginaAtual((pagina) => {
                        let proxima = pagina + 1
                        setPaginaAtual( proxima );
                        return proxima
                    })
                }
            }
        })
        intersectionObserver.observe(document.querySelector("#fimPagina"))
        return () => intersectionObserver.disconnect()
    }, [])
    
    React.useEffect(() => {
        setPaginaAtual(0)
    }, [parametros])

    return (
        <>
        <Container variant="main" >
            <Paper 
                variant="section" 
                id="top" 
                elevation={6} 
                sx={{m:2}} 
                >
                <TypographyH1 as="h1" >
                    {infoPagina.title}
                </TypographyH1>
                <TypographyH2 as="h2" >
                    {infoPagina.qtde_total} Imóveis encontrados
                </TypographyH2>
            </Paper>
            <Box>
                <ul style={{ listStyleType:"none"}} >
                    {imoveis.map( (imovel) => (
                        <ImovelLista 
                            className="imovel"
                            key={`lista-${imovel._id}`} 
                            imovel={imovel} 
                        />
                     ) )}
                    <li id="fimPagina" key="fim de pagina" >
                        <Paper elevation={8} align="center" sx={{m:"10px"}} >
                            {valorFimDalista()}
                        </Paper>
                        
                    </li>
                </ul>
            </Box>
        </Container>
        </>
    );
}

