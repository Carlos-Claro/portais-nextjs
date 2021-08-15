import * as React from 'react';
import { Autocomplete, Box, Checkbox, Divider, Paper, SwipeableDrawer, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BairrosInput from './bairros';
import TiposInput from './tipos';
import PropTypes from 'prop-types'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const tipo_negocio = ["venda","locacao"]


export default function Filtro(props){
    
    

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
              <Typography 
              variant="h3" 
              sx={{fontSize: 24, textAlign:'center', p: '10px 0px'}} 
              children="Encontre os melhores imóveis"
              />

            <Box sx={{width: '100%', typography: 'body1'}}>
                <Tabs 
                variant="fullWidth"
                value={tipo_negocio.indexOf(props.parametros.tipo_negocio)} 
                onChange={(object, value) => {
                    props.handleParametros('tipo_negocio', object.target.id)
                }} 
                aria-label="Selecione o tipo de negócio desejado" 
                >
                    <Tab label="Venda" id="venda" />
                    <Tab label="Aluguel" id="locacao" />
                </Tabs>
            </Box>

            <BairrosInput 
            handleParametros={(item, valor) => props.handleParametros(item, valor)} 
            bairrosSelecionados={props.parametros.bairros_link}  
            icon={icon}
            checkedIcon={checkedIcon}
            isOpen={props.isOpen}
            bairros={props.bairros}
            />
            <Divider />
            <TiposInput 
            handleParametros={(item, valor) => props.handleParametros(item, valor)} 
            selecionados={props.parametros.imoveis_tipos_link}  
            icon={icon}
            checkedIcon={checkedIcon}
            />
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