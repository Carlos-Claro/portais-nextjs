import { Autocomplete, Checkbox, Chip, TextField } from "@material-ui/core"
import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import { getSelecionados } from "../../store/Filtro/Filtro.selectors"
import { handleFiltro } from "../../store/Filtro/Filtro.actions"

import BairrosMock from "../../mocks/bairros/curitiba_pr.json"

export default function BairrosInput(props){
    const bairrosSelecionados = useSelector(state => getSelecionados(state, 'bairros_link'))
    const cidadeSelecionada = useSelector(state => state.parametros.cidade_link)
    const dispatch = useDispatch()
    const [open,setOpen] = React.useState(false)
    const handleParametros = (valor) => {
        dispatch(handleFiltro('bairros_link',valor))
    }
    const bairrosProps = {
        options: BairrosMock,
        getOptionLabel: (option) => option.descricao,
        multiple:true,
        open:open,
        disableCloseOnSelect:true,
        disableClearable:true,
        includeInputInList:true,
        defaultValue: () => { 
            
            if (bairrosSelecionados){
                return BairrosMock.filter( (item) => bairrosSelecionados.indexOf(item.id) >= 0)
            }
        },
        renderOption:(props, option, {selected}) => { return (
            <li {...props} >
                <Checkbox 
                icon={props.icon}
                checkedIcon={props.checkedIcon}
                style={{marginRight:8}}
                checked={selected || bairrosSelecionados.indexOf(option.id) >= 0}
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
                        {...bairrosProps}
                        id="bairro"
                        renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="autoComplete" 
                            variant="standard" 
                            label="Encontre por Bairro" 
                            
                            />
                            )}
                        />
            )
    

        

}    

BairrosInput.defaultProps = {
    isOpen: false
}
BairrosInput.propTypes = {
    handleParametros:PropTypes.func,
    icon:PropTypes.node,
    checkedIcon:PropTypes.node,
    isOpen:PropTypes.bool,
}


