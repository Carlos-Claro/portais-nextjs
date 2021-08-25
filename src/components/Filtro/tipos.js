import React from "react"
import { Autocomplete, Checkbox, Chip, TextField } from "@material-ui/core"

import tiposMock from '../../mocks/tipos.json'

import PropTypes from 'prop-types'

import { useDispatch, useSelector } from "react-redux"
import { getSelecionados } from "../../store/Filtro/Filtro.selectors"
import { handleFiltro } from "../../store/Filtro/Filtro.actions"


export default function TiposInput(props){
    const dispatch = useDispatch()
    const selecionados = useSelector(state => getSelecionados(state,'imoveis_tipos_link'))
    const [open,setOpen] = React.useState(false)
    const handleParametros = (valor) => {
        dispatch(handleFiltro('imoveis_tipos_link',valor));
    }
    const Props = {
        options: tiposMock,
        getOptionLabel: (option) => option.descricao,
        multiple:true,
        open:open,
        disableCloseOnSelect:true,
        disableClearable:true,
        includeInputInList:true,
        defaultValue: () => {
            if (selecionados){
                return tiposMock.filter( (item) => selecionados.indexOf(item.id) >= 0)
            }
            return []
        },
        renderOption:(props, option, {selected}) => {
            return (
            <li {...props} >
                <Checkbox 
                icon={props.icon}
                checkedIcon={props.checkedIcon}
                style={{marginRight:8}}
                checked={selected || selecionados.indexOf(option.id) >= 0}
                value={option.id}
                />
                {option.descricao}
            </li>
            )},
        renderTags:(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option.descricao} {...getTagProps({ index })} />),
        onOpen: () => {
            setOpen(true)
        },
        onClose: () => {
            setOpen(false)
        },
        onChange:(e,v,r) => {
            const reasons = ['removeOption', 'selectOption'];
            if( reasons.indexOf(r) >= 0 ){
                if (v.length === 0) {
                    handleParametros([])
                }else{
                    const b = v.map((ba) => ba.id);
                    handleParametros(b)
                }
            }
        },
    }
    
    return (

                <Autocomplete
                        {...Props}
                        id="tipo_imovel"
                        renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="autoComplete" 
                            variant="standard" 
                            label="Selecione tipos de imóvel" 
                            />
                            )}
                        />
            )
    

        

}    

TiposInput.defaultProps = {
    selecionados: [],
}
TiposInput.propTypes = {
    
    icon:PropTypes.node,
    checkedIcon:PropTypes.node
}

