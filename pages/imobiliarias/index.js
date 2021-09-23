import { CircularProgress, Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../src/components/Header";
import { setToken, setImobiliarias as setImobiliariasAction } from "../../src/store/Carregamento/Carregamento.actions";
import { useImobiliarias } from "../../src/uteis/ApiSWR";
import Imobiliaria from "./imobiliaria";


export default function Imobiliarias(){
    const token = useSelector(state => state.carregamento.token)
    const dispatch = useDispatch()
    const [paginaAtual, setPaginaAtual] = React.useState(1);
    const cidade = {
        link:'sao_jose_dos_pinhais_pr',
        nome:"São José dos Pinais"
    }
    const {imobiliarias, isLoading, isError} = useImobiliarias(token, cidade.link)
    console.log(isLoading, isError);
    console.log(imobiliarias);
    React.useEffect(() => {
        if ( ! token ){
          const item = new ApiService
            item.Auth().then(res => {
                dispatch(setToken(res.token))
                dispatch(setImobiliariasAction())
            })
        }
      }, [])
    
    return (
       <>
        <Header noFiltro={true} />
        <Container>
            <Typography as="h1">Imobiliárias em {cidade.nome}.</Typography>
            <Typography as="h2">Consulte nossa relação de imobiliarias anunciantes em Curitiba e encontre a mais perto de você.</Typography>
            <ul>{
                ( isLoading
                ? (<Paper elevation={8} align="center" sx={{m:"10px"}} >
                <CircularProgress />
                <br />
                <Typography variant="caption"  align="center">
                    Carregando imobiliárias
                </Typography>
            </Paper>)
                : ( isError
                    ? 'erro no fetch'
                    : imobiliarias.map((imobiliaria,index) => <Imobiliaria imobiliaria={imobiliaria} key={`imobiliaria-${index}`} />)
                    )
                )
            }
            </ul>
        </Container>
       </>
    )
}