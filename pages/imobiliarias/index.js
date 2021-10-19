import { CircularProgress, Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../src/components/Header";
import { setToken, setImobiliarias as setImobiliariasAction } from "../../src/store/Carregamento/Carregamento.actions";
import ApiService from "../../src/uteis/ApiService";
import Imobiliaria from "../../src/components/Imobiliaria";


export default function Imobiliarias(){
    const token = useSelector(state => state.carregamento.token)
    const carregamento = useSelector(state => state.carregamento.imobiliarias)
    const dispatch = useDispatch()
    const [imobiliarias, setImobiliarias] = React.useState([]);
    const [paginaAtual, setPaginaAtual] = React.useState(1);
    const cidade = {
        link:process.env.NEXT_PUBLIC_CIDADE_LINK,
        nome:process.env.NEXT_PUBLIC_CIDADE
    }
    React.useEffect(() => {
        if ( ! token ){
          const item = new ApiService
            item.Auth().then(res => {
                dispatch(setToken(res.token))
                dispatch(setImobiliariasAction())
            })
        }
      }, [])
    React.useEffect(() => {
        if ( token ){
            const item = new ApiService(token)
            item.GetImobiliarias(cidade.link).then((res) => {
                if ( paginaAtual == 1 ){
                    setImobiliarias(res.itens)  
                }else{
                    setImobiliarias((itensAtual) => [...itensAtual,...res.itens])  
                }
            });
        }
    },[carregamento]);

    return (
       <>
        <Header noFiltro={true} />
        <Container>
            <Typography as="h1">Imobiliárias em {cidade.nome}.</Typography>
            <Typography as="h2">Consulte nossa relação de imobiliarias anunciantes em Curitiba e encontre a mais perto de você.</Typography>
            <ul>{
                
                (imobiliarias.length)
                ? imobiliarias.map((imobiliaria,index) => <Imobiliaria imobiliaria={imobiliaria} key={`imobiliaria-${index}`} component="li" />)
                : (<Paper elevation={8} align="center" sx={{m:"10px"}} >
                    <CircularProgress />
                    <br />
                    <Typography variant="caption"  align="center">
                        Carregando imobiliárias
                    </Typography>
                </Paper>)
            }
            </ul>
        </Container>
       </>
    )
}