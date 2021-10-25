import React, { useEffect } from 'react';
import {  Box, Divider, Grid, IconButton, Paper, SwipeableDrawer, Tab, Tabs, Typography } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BairrosInput, {BairrosSelect} from './bairros';
import {TiposSelect} from './tipos';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { handleFiltro, limpaFiltro } from '../../store/Filtro/Filtro.actions';
import Range from './range';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BedIcon from '@material-ui/icons/Bed';
import BathtubIcon from '@material-ui/icons/Bathtub';
import OpenInFullIcon from '@material-ui/icons/OpenInFull';
import DirectionsCarFilledIcon from '@material-ui/icons/DirectionsCarFilled';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SearchIcon from '@material-ui/icons/Search';

import { styled } from '@material-ui/core/styles';
import ApiService from '../../uteis/ApiService';
import router from 'next/router';

const MyDivider = styled(Divider)(({ theme }) => ({
    marginTop:0,
    marginBottom:10,
  }));
const MyTitulo = styled(Typography)(({theme}) => ({
    fontSize: 20, 
    textAlign:'left', 
    marginLeft:20,
    marginTop:15,
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const tipo_negocio = ["venda","locacao"]

export default function FiltroHome(props){
    const parametros = useSelector(state => state.parametros)
    const dispatch = useDispatch()
    const token = useSelector(state => state.carregamento.token)
    const [qtdePesquisado, setQtdePesquisado] = React.useState()
    const retornaParametrosURL = () => {
        var pesquisa = Object.keys(parametros).map((chave,i) => (
                                            parametros[chave] != '' 
                                                    ? (i ? '&' : '' ) + chave + '=' + parametros[chave] 
                                                    : '' 
                                                    )).join('')
        
        return pesquisa
    };
    useEffect(() => {
            const item = new ApiService(token)
            item.QtdeImoveis(retornaParametrosURL()).then((res) => {
                setQtdePesquisado(res.qtde_total)
            })
    },[parametros])

    const handlePesquisar = () => {
        const item = new ApiService(token)
        item.URLPrincipal(retornaParametrosURL()).then((res) => {
            if ( ! router.query['url'] || (router.query['url'] && router.query['url'][0] !== res.uri)){
                router.push({
                    pathname: '/[...url]',
                    query: { url: [res.uri] }
                }, 
                undefined, { shallow: true }
                )
            }
        })
    }
    return (
    <>
        <Paper
            sx={{p:'2px 4px', display: 'table', alignItems: 'center', width:'96%', m:'5px auto', mt:"70px"}}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                    <MyTitulo 
                        variant="h3" 
                        children="Encontre os melhores imóveis"
                    />
                    <Typography variant="p" sx={{marginLeft:"20px"}}>
                        {qtdePesquisado} imóveis para esta pesquisa
                    </Typography>
                </Grid>
                  
              </Grid>
            </Paper>
          <Paper 
          component="form"
          sx={{p:'2px 4px', display: 'table', alignItems: 'center', width:'96%', m:'0px auto'}}
          >
            <Box sx={{width: '100%', typography: 'body1'}}>
                <Tabs 
                variant="fullWidth"
                value={tipo_negocio.indexOf(parametros.tipo_negocio)} 
                onChange={(object, value) => {
                    dispatch(handleFiltro('tipo_negocio', object.target.id))
                    dispatch(limpaFiltro('preco_venda'))
                    dispatch(limpaFiltro('preco_locacao'))
                }} 
                aria-label="Selecione o tipo de negócio desejado" 
                >
                    <Tab label="Venda" id="venda" />
                    <Tab label="Aluguel" id="locacao" />
                </Tabs>
            </Box>
            <BairrosSelect/>
            <MyDivider />
            <TiposSelect />
            <MyDivider />
            {
                parametros.tipo_negocio == "venda" ? 
                    <Range 
                        tipo="venda" 
                        name="preco_venda"
                        label="Valor de venda" 
                        iconeInicio={<AttachMoneyIcon fontSize="small" />} 
                        iconeFim={<AttachMoneyIcon fontSize="large" />} 
                        valor={[100000,500000]}
                        />
                :
                    <Range 
                        tipo="locacao" 
                        name="preco_locacao"
                        label="Valor aluguel" 
                        iconeInicio={<AttachMoneyIcon fontSize="small" />} 
                        iconeFim={<AttachMoneyIcon fontSize="large" />} 
                        valor={[1000,5000]}
                        />
            }
            <MyDivider />
            <Range 
                tipo="unidade" 
                name="quartos"
                label="Quartos" 
                iconeInicio={<BedIcon fontSize="medium" />} 
                valor={2}
                />
            
            
            
            </Paper>
            <Paper elevation={8} onClick={() => handlePesquisar()}>
                <IconButton 
                    
                    aria-label="fecha filtro"
                    sx={{width:"100%"}} 
                    
                    color="secondary" 
                    size="large" 
                    variant="contained">
                    <SearchIcon fontSize="inherit" />
                    <Typography sx={{fontSize:10, display:"block"}} >Pesquisar</Typography>
                </IconButton>
            </Paper>
    </>)
}