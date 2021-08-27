import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ApiService from "../../uteis/ApiService";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";

import { setParametros } from "../../store/Filtro/Filtro.actions";

import ImoveisMock from "../../mocks/imoveisItens.json"

import { useRouter } from "next/router";
import { CircularProgress, Divider, Paper, Typography } from "@material-ui/core";

import Imoveis from "../Imoveis";

import dynamic from 'next/dynamic'
const NaoEncontreiDinamico = dynamic(
  () => import('../NaoEncontrei'),
  {
    ssr:true
  }
)

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

export default function Lista(props){
    
    const parametros = useSelector(state => state.parametros)
    const carregamento = useSelector(state => state.carregamento)
    const [qtdeItensporPagina, setQtdeItensporPagina] = React.useState(5)
    const [infoPagina, setInfoPagina] = React.useState({
          qtde_total: 1420,
          titulo:'Imóveis em São José dos Pinhais'
    })
    const [imoveis, setImoveis] = React.useState(ImoveisMock)
    const [paginaAtual, setPaginaAtual] = React.useState(props.paginaAtual);
    const retornaParametrosURL = () => {
        var pesquisa = Object.keys(parametros).map((chave,i) => parametros[chave] != '' ? (i ? '&' : '' ) + chave + '=' + parametros[chave] : '' ).join('')
        pesquisa += '&limit=' + qtdeItensporPagina + '&skip=' + ( paginaAtual * qtdeItensporPagina )
        return pesquisa
    };
    
    const [fimDaLista, setFimDaLista] = React.useState(false)

    const dispatch = useDispatch()
    const router = useRouter()
  
    

    /**
     * Carga de imóveis, altera quando paginaAtual ou parametros são altertados, e na primeira carga
     */
    React.useEffect(() => {
            const item = new ApiService
            item.tituloQtdeImoveis(retornaParametrosURL()).then((res) => {
                setInfoPagina({qtde_total:res.qtde_total,titulo:res.titulo})
                if ( res.itens.length ){
                    
                    if ( paginaAtual == 1 ){
                        setImoveis(res.itens)
                        // if ( ! router.query['url'] || (router.query['url'] && router.query['url'][0] !== res.uri)){
                        //     router.push({
                        //         pathname: '/[...url]',
                        //         query: { url: [res.uri] }
                        //     }, 
                        //     undefined, { shallow: true }
                        //     )
                        // }
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
                }
                else{
                    setFimDaLista(true)
                }
                
            });
    }, [paginaAtual, carregamento.imoveis])
    /**
     * verifica fim da pagina
     */
    React.useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            if ( entries.some(entry => entry.isIntersecting) ){
                let imovelClass = document.querySelectorAll(".imovel")
             
                if ( imovelClass.length > 0 ){
                    setPaginaAtual((pagina) => {
                        let proxima = pagina + 1
                        props.handlePaginaAtual( proxima );
                        return proxima
                    })
                }
            }
        })
        intersectionObserver.observe(document.querySelector("#fimPagina"))
        return () => intersectionObserver.disconnect()
    }, [])
    
    return (
        <>
        <Container variant="main" >
            <Box variant="section" id="top">
                <TypographyH1 as="h1" >
                    {infoPagina.titulo}
                </TypographyH1>
                <TypographyH2 as="h2" >
                    {infoPagina.qtde_total} Imóveis encontrados
                </TypographyH2>
            </Box>
            <Box>
                <ul style={{ listStyleType:"none"}} >
                    {imoveis.map( (imovel) => (
                        <Imoveis 
                            className="imovel"
                            key={`lista-${imovel._id}`} 
                            imovel={imovel} 
                        />
                     ) )}
                    <li id="fimPagina" key="fim de pagina" >
                        <Paper elevation={8} align="center" sx={{m:"10px"}} >
                            {
                                fimDaLista 
                                ? (
                                    <>
                                        <Typography variant="overline">
                                            Esta lista acabou!!! 
                                            <br />
                                            O que fazer agora?
                                        </Typography>
                                        
                                    </>
                                )
                                : (
                                    <>
                                        <CircularProgress />
                                        <br />
                                        <Typography variant="caption"  align="center">
                                            Carregando mais imóveis
                                        </Typography>
                                    </>

                                )
                            }
                            
                        </Paper>
                        
                    </li>
                </ul>
            </Box>
        </Container>
        </>
    );
}

Lista.defaultProps = {
    paginaAtual: 1
}

Lista.propTypes = {
    handlePaginaAtual:PropTypes.func,
    paginaAtual:PropTypes.number
}