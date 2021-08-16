import { Container, Typography } from "@material-ui/core";
import React from "react";

import Header from "../../src/components/Header";
import ApiService from "../../src/uteis/ApiService";
import Imobiliaria from "./imobiliaria";


export default function Imobiliarias(){
    
    const [imobiliarias, setImobiliarias] = React.useState([]);
    const [paginaAtual, setPaginaAtual] = React.useState(1);
    const cidade = {
        link:'sao_jose_dos_pinhais_pr',
        nome:"São José dos Pinais"
    }

    React.useEffect(() => {
        const item = new ApiService
        item.GetImobiliarias(cidade.link).then((res) => {
            if ( paginaAtual == 1 ){
                setImobiliarias(res.itens)  
            }else{
                setImobiliarias((itensAtual) => [...itensAtual,...res.itens])  
            }
        });
    },[]);

    return (
       <>
        <Header noFiltro={true} />
        <Container>
            <Typography as="h1">Imobiliárias em {cidade.nome}.</Typography>
            <Typography as="h2">Consulte nossa relação de imobiliarias anunciantes em Curitiba e encontre a mais perto de você.</Typography>
            <ul>{
                imobiliarias.map((imobiliaria,index) => <Imobiliaria imobiliaria={imobiliaria} key={`imobiliaria-${index}`} />)
            }
            </ul>
        </Container>
       </>
    )
}