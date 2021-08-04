import React from "react";
import styled from "styled-components";
import Imoveis from "../Imoveis";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import ApiService from "../../uteis/ApiService";


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
    const [parametrosURL, setParametrosURL] = React.useState(props.parametros)
    
    const [qtdeItensporPagina, setQtdeItensporPagina] = React.useState(5)
    const [paginaAtual, setPaginaAtual] = React.useState(1)
    const [infoPagina, setInfoPagina] = React.useState({
          qtde_total: 1420,
          titulo:'Imóveis em São José dos Pinhais'
    })
    const [imoveis, setImoveis] = React.useState([
        {
                "_id": 1,
                "area": 0.0,
                "area_terreno": 100.00,
                "area_util": 100.0,
                "bairro": "Centro",
                "bairro_cidade": 2,
                "bairro_combo": 62,
                "bairros_link": "centro",
                "banheiros": 2,
                "cep": "80000-000",
                "cidade": "Curitiba",
                "cidade_link": "curitiba_pr",
                "cidade_nome": "Curitiba",
                "cidades_id": 2,
                "cidades_link": "curitiba_pr",
                "cobertura": "0",
                "comercial": 0,
                "condominio": "0",
                "condominio_valor": "0",
                "creci": "J05400",
                "data_atualizacao": "2020-10-28 06:00",
                "data_update": "2021-04-08T00:34:43.840000Z",
                "ddd": 41,
                "descricao": "Apartamento semimobiliado no Edifício medindo aprox. 100,00m², contendo 03 quartos (sendo 01 suíte com hidromassagem), sala para 02 ambientes, cozinha, sacada com churrasqueira, área de serviço e 01 vaga de garagem.\n\n* Móveis planejados;\n* Janelas em PVC;\n* Face norte;\n* Sacada com vidro reiki.\n\nCondomínio conta com:\n\n* Portaria eletrônica;\n* 02 elevadores;\n* Salão de festas. \n\n\nL.P.",
                "destaque_bairro": 0,
                "destaque_tipo": 0,
                "email_corretor": "",
                "empresa_email": "contato@pow.com.br",
                "empresa_telefone_sms": "",
                "estado": "Paraná",
                "garagens": 1,
                "id": "000001",
                "id_cidade": 2,
                "id_empresa": "81881",
                "id_tipo": 1,
                "images": [
                    {
                        "arquivo": "https://icuritiba.com/imagens/naodisponivel.jpg",
                        "data": "2021-02-20T01:02:00Z",
                        "extensao": "jpg",
                        "gerado_image": 1,
                        "id": 40521925,
                        "id_empresa": 83975,
                        "id_imovel": 2244808,
                        "ordem": 1,
                        "original": "https://icuritiba.com/imagens/naodisponivel.jpg",
                        "titulo": "Imóvel de teste"
                    },
                    {
                        "arquivo": "https://icuritiba.com/imagens/naodisponivel.jpg",
                        "data": "2021-02-20T01:02:00Z",
                        "extensao": "jpg",
                        "gerado_image": 1,
                        "id": 40521926,
                        "id_empresa": 83975,
                        "id_imovel": 2244808,
                        "ordem": 3,
                        "original": "https://icuritiba.com/imagens/naodisponivel.jpg",
                        "titulo": "Imagem 2 teste"
                    },
                    {
                        "arquivo": "https://icuritiba.com/imagens/naodisponivel.jpg",
                        "data": "2021-02-20T01:02:00Z",
                        "extensao": "jpg",
                        "gerado_image": 1,
                        "id": 40521927,
                        "id_empresa": 83975,
                        "id_imovel": 2244808,
                        "ordem": 4,
                        "original": "https://icuritiba.com/imagens/naodisponivel.jpg",
                        "titulo": "Image 3 Teste"
                    },
                    {
                        "arquivo": "https://icuritiba.com/imagens/naodisponivel.jpg",
                        "data": "2021-02-20T01:02:00Z",
                        "extensao": "jpg",
                        "gerado_image": 1,
                        "id": 40521928,
                        "id_empresa": 83975,
                        "id_imovel": 2244808,
                        "ordem": 5,
                        "original": "https://icuritiba.com/imagens/naodisponivel.jpg",
                        "titulo": "Image 4 teste"
                    }
                ],
                "imobiliaria_bairro": "Centro",
                "imobiliaria_cidade": "Curitiba",
                "imobiliaria_logradouro": "Rua Comendador franco",
                "imobiliaria_nome": "Imobiliária da Casa POW",
                "imobiliaria_nome_seo": "Imobiliaria-Casa-Tow",
                "imobiliaria_numero": "7313",
                "imobiliaria_telefone": "3382-1581",
                "imobiliaria_whatsapp": "4133821581",
                "imoveis_tipos_english": "Apartment",
                "imoveis_tipos_id": 1,
                "imoveis_tipos_link": "apartamento",
                "imoveis_tipos_titulo": "Apartamento",
                "imovel_id_cidade": 2,
                "imovel_para": [
                    "venda"
                ],
                "integra": "python",
                "latitude": -25.406791,
                "lazer": 0,
                "locacao": 0,
                "locacao_dia": 0,
                "locacao_email": "",
                "location": [
                    -49.253961,
                    -25.406791
                ],
                "logo": "1b7ef4fb54677c2f3fd7c9f899143d44.jpeg",
                "logradouro": "Rua Simão Brante",
                "logradouro_": null,
                "longitude": -49.253961,
                "mapa": "-25.406791, -49.253961",
                "mobiliado": "0",
                "mostramapa": 1,
                "mudou": 1,
                "nome": "Apartamento semimobiliado à venda Centro - Curitiba/PR",
                "nome_corretor": null,
                "nome_empresa": "Imobiliária Casa Pow",
                "novo": "0",
                "numero": "220",
                "ordem": 99841,
                "pagina_limite_ofertas": 20,
                "preco": 599000.0,
                "preco_locacao": 0.0,
                "preco_locacao_dia": 0.0,
                "preco_venda": 599000.0,
                "quartos": 3,
                "referencia": "3622",
                "residencial": 1,
                "situacao_link": null,
                "situacao_titulo": null,
                "sms_corretor": null,
                "sms_limite": 0,
                "sms_quem": 0,
                "status": "0-0-0-0",
                "suites": "1",
                "tem_foto": true,
                "terreno": "0",
                "tipo": "venda",
                "tipo_locacao": 0,
                "tipo_locacao_dia": 0,
                "tipo_negocio": "venda",
                "tipo_venda": 1,
                "uf": "PR",
                "uso": "Residencial",
                "valores": "599000.00-0.00-0.00",
                "venda": 1,
                "video": "",
                "views": 0,
                "vila": ""
            },
            {
                    "_id": 2,
                    "area": 0.0,
                    "area_terreno": 100.00,
                    "area_util": 100.0,
                    "bairro": "Centro",
                    "bairro_cidade": 2,
                    "bairro_combo": 62,
                    "bairros_link": "centro",
                    "banheiros": 2,
                    "cep": "80000-000",
                    "cidade": "Curitiba",
                    "cidade_link": "curitiba_pr",
                    "cidade_nome": "Curitiba",
                    "cidades_id": 2,
                    "cidades_link": "curitiba_pr",
                    "cobertura": "0",
                    "comercial": 0,
                    "condominio": "0",
                    "condominio_valor": "0",
                    "creci": "J05400",
                    "data_atualizacao": "2020-10-28 06:00",
                    "data_update": "2021-04-08T00:34:43.840000Z",
                    "ddd": 41,
                    "descricao": "Apartamento semimobiliado no Edifício medindo aprox. 100,00m², contendo 03 quartos (sendo 01 suíte com hidromassagem), sala para 02 ambientes, cozinha, sacada com churrasqueira, área de serviço e 01 vaga de garagem.\n\n* Móveis planejados;\n* Janelas em PVC;\n* Face norte;\n* Sacada com vidro reiki.\n\nCondomínio conta com:\n\n* Portaria eletrônica;\n* 02 elevadores;\n* Salão de festas. \n\n\nL.P.",
                    "destaque_bairro": 0,
                    "destaque_tipo": 0,
                    "email_corretor": "",
                    "empresa_email": "contato@pow.com.br",
                    "empresa_telefone_sms": "",
                    "estado": "Paraná",
                    "garagens": 1,
                    "id": "000001",
                    "id_cidade": 2,
                    "id_empresa": "81881",
                    "id_tipo": 1,
                    "images": [
                        {
                            "arquivo": "https://icuritiba.com/imagens/naodisponivel.jpg",
                            "data": "2021-02-20T01:02:00Z",
                            "extensao": "jpg",
                            "gerado_image": 1,
                            "id": 40521925,
                            "id_empresa": 83975,
                            "id_imovel": 2244808,
                            "ordem": 1,
                            "original": "https://icuritiba.com/imagens/naodisponivel.jpg",
                            "titulo": "Imóvel de teste"
                        },
                        {
                            "arquivo": "https://icuritiba.com/imagens/naodisponivel.jpg",
                            "data": "2021-02-20T01:02:00Z",
                            "extensao": "jpg",
                            "gerado_image": 1,
                            "id": 40521926,
                            "id_empresa": 83975,
                            "id_imovel": 2244808,
                            "ordem": 3,
                            "original": "https://icuritiba.com/imagens/naodisponivel.jpg",
                            "titulo": "Imagem 2 teste"
                        },
                        {
                            "arquivo": "https://icuritiba.com/imagens/naodisponivel.jpg",
                            "data": "2021-02-20T01:02:00Z",
                            "extensao": "jpg",
                            "gerado_image": 1,
                            "id": 40521927,
                            "id_empresa": 83975,
                            "id_imovel": 2244808,
                            "ordem": 4,
                            "original": "https://icuritiba.com/imagens/naodisponivel.jpg",
                            "titulo": "Image 3 Teste"
                        },
                        {
                            "arquivo": "https://icuritiba.com/imagens/naodisponivel.jpg",
                            "data": "2021-02-20T01:02:00Z",
                            "extensao": "jpg",
                            "gerado_image": 1,
                            "id": 40521928,
                            "id_empresa": 83975,
                            "id_imovel": 2244808,
                            "ordem": 5,
                            "original": "https://icuritiba.com/imagens/naodisponivel.jpg",
                            "titulo": "Image 4 teste"
                        }
                    ],
                    "imobiliaria_bairro": "Centro",
                    "imobiliaria_cidade": "Curitiba",
                    "imobiliaria_logradouro": "Rua Comendador franco",
                    "imobiliaria_nome": "Imobiliária da Casa POW",
                    "imobiliaria_nome_seo": "Imobiliaria-Casa-Tow",
                    "imobiliaria_numero": "7313",
                    "imobiliaria_telefone": "3382-1581",
                    "imobiliaria_whatsapp": "4133821581",
                    "imoveis_tipos_english": "Apartment",
                    "imoveis_tipos_id": 1,
                    "imoveis_tipos_link": "apartamento",
                    "imoveis_tipos_titulo": "Apartamento",
                    "imovel_id_cidade": 2,
                    "imovel_para": [
                        "venda"
                    ],
                    "integra": "python",
                    "latitude": -25.406791,
                    "lazer": 0,
                    "locacao": 0,
                    "locacao_dia": 0,
                    "locacao_email": "",
                    "location": [
                        -49.253961,
                        -25.406791
                    ],
                    "logo": "1b7ef4fb54677c2f3fd7c9f899143d44.jpeg",
                    "logradouro": "Rua Simão Brante",
                    "logradouro_": null,
                    "longitude": -49.253961,
                    "mapa": "-25.406791, -49.253961",
                    "mobiliado": "0",
                    "mostramapa": 1,
                    "mudou": 1,
                    "nome": "Apartamento semimobiliado à venda Centro - Curitiba/PR",
                    "nome_corretor": null,
                    "nome_empresa": "Imobiliária Casa Pow",
                    "novo": "0",
                    "numero": "220",
                    "ordem": 99841,
                    "pagina_limite_ofertas": 20,
                    "preco": 599000.0,
                    "preco_locacao": 0.0,
                    "preco_locacao_dia": 0.0,
                    "preco_venda": 599000.0,
                    "quartos": 3,
                    "referencia": "3622",
                    "residencial": 1,
                    "situacao_link": null,
                    "situacao_titulo": null,
                    "sms_corretor": null,
                    "sms_limite": 0,
                    "sms_quem": 0,
                    "status": "0-0-0-0",
                    "suites": "1",
                    "tem_foto": true,
                    "terreno": "0",
                    "tipo": "venda",
                    "tipo_locacao": 0,
                    "tipo_locacao_dia": 0,
                    "tipo_negocio": "venda",
                    "tipo_venda": 1,
                    "uf": "PR",
                    "uso": "Residencial",
                    "valores": "599000.00-0.00-0.00",
                    "venda": 1,
                    "video": "",
                    "views": 0,
                    "vila": ""
                }])
    const retornaParametrosURL = () => {
        var pesquisa = Object.keys(props.parametros).map((chave,i) => props.parametros[chave] != '' ? (i ? '&' : '' ) + chave + '=' + props.parametros[chave] : '' ).join('')
        pesquisa += '&limit=' + qtdeItensporPagina + '&skip=' + ( paginaAtual * qtdeItensporPagina )
        return pesquisa
    };
    /**
     * Primeira carga de imóveis
     */
    React.useEffect(() => {
        const item = new ApiService
        item.tituloQtdeImoveis(retornaParametrosURL()).then((res) => {
            setInfoPagina({qtde_total:res.qtde_total,titulo:res.titulo})
            if ( paginaAtual == 1 ){
                setImoveis(res.itens)  
            }else{
                setImoveis((itensAtual) => [...itensAtual,...res.itens])  
            }
        });
    }, [paginaAtual, props.parametros])
    /**
     * verifica fim da pagina
     */
    React.useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            if ( entries.some(entry => entry.isIntersecting) ){
                setPaginaAtual((atual) => atual + 1);
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
                <ul>
                    {imoveis.map( (imovel) => (
                        <>
                        
                        <Imoveis 
                        key={imovel._id} 
                        imovel={imovel} 
                        isFavorito={props.favoritos.indexOf(imovel._id) === -1} 
                        handleFavorito={(favorito) => props.clickFavorito(favorito)}
                        />
                     </>) )}
                    <li id="fimPagina">fim da pagina</li>
                </ul>
            </Box>
        </Container>
        </>
    );
}