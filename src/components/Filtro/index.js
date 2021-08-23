import React from 'react';
import {  Box, Button, Divider, Grid, IconButton, Paper, SwipeableDrawer, Tab, Tabs, Typography } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BairrosInput from './bairros';
import TiposInput from './tipos';
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

import styled from "styled-components";

const MyDivider = styled(Divider)`
    margin-bottom: 5px;
    margin-top: 25px;
`


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const tipo_negocio = ["venda","locacao"]


export default function Filtro(props){
    const parametros = useSelector(state => state.parametros)
    const dispatch = useDispatch()
    return (
        <SwipeableDrawer 
          anchor="top" 
          open={props.isOpen}
          onClose={props.handleToggle(false)} 
          onOpen={props.handleToggle(true)}
        >
          <Paper 
          component="form"
          sx={{p:'2px 4px', display: 'table', alignItems: 'center', width:'96%', m:'0px auto'}}
          >
              <Grid container spacing={1}>
                  <Grid item xs={11}>
                        <Typography 
                        variant="h3" 
                        sx={{fontSize: 24, textAlign:'center', p: '10px 0px'}} 
                        children="Encontre os melhores imóveis"
                        />

                  </Grid>
                  <Grid item xs={1}>
                        <IconButton 
                            aria-label="fecha filtro"
                            sx={{width:"100%"}} 
                            onClick={props.handleToggle(false)} 
                            color="secondary" 
                            size="large" 
                            variant="contained">
                            <ArrowDropUpIcon fontSize="inherit" />
                        </IconButton>
                  </Grid>
              </Grid>

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
            
            <BairrosInput 
            icon={icon}
            checkedIcon={checkedIcon}
            isOpen={props.isOpen}
            bairros={props.bairros}
            />
            <MyDivider />
            <TiposInput 
            icon={icon}
            checkedIcon={checkedIcon}
            />
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
            <MyDivider />
            <Range 
                tipo="unidade"
                name="banheiros" 
                label="Banheiros" 
                iconeInicio={<BathtubIcon fontSize="medium" />} 
                valor={1}
                />
            <MyDivider />
            <Range 
                tipo="unidade" 
                name="garagens"
                label="Vagas" 
                iconeInicio={<DirectionsCarFilledIcon fontSize="medium" />} 
                valor={3}
                />
            <MyDivider />
            
                    <Range 
                        tipo="area" 
                        name="area_util"
                        label="Area util" 
                        iconeInicio={<OpenInFullIcon fontSize="small" />} 
                        iconeFim={<OpenInFullIcon fontSize="large" />} 
                        valor={[100,500]}
                        />
            <MyDivider />
            </Paper>
            <Paper elevation="10" variant="outlined" >
                <IconButton 
                    aria-label="fecha filtro"
                    sx={{width:"100%"}} 
                    onClick={props.handleToggle(false)} 
                    color="secondary" 
                    size="large" 
                    variant="contained">
                    <ArrowDropUpIcon fontSize="inherit" />
                </IconButton>
            </Paper>
        </SwipeableDrawer>
    )
}

Filtro.defaultProps = {
    isOpen: false
}

Filtro.propTypes = {
    handleToggle:PropTypes.func,
    isOpen:PropTypes.bool,
    handleParametros:PropTypes.func,
    parametros:PropTypes.object,
    bairros:PropTypes.arrayOf(PropTypes.object)
}