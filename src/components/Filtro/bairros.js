import { Autocomplete, Checkbox, Chip, TextField } from "@material-ui/core"
import React from "react"
import PropTypes from 'prop-types'

export default function BairrosInput(props){
    
    const [bairrosSelecionados, setBairrosSelecionados] = React.useState(props.bairrosSelecionados)
    const [bairros, setBairros] = React.useState(props.bairros)
    const [open,setOpen] = React.useState(false)
    
    const handleBairros = (item) => (event) => {
        setBairrosSelecionados((bairrosAtuais) => {
            return [...bairrosAtuais, item]
          })
    }
    const handleParametros = (valor) => {
        props.handleParametros('bairros_link',valor)
    }

    const bairrosProps = {
        options: bairros,
        getOptionLabel: (option) => option.nome_,
        multiple:true,
        open:open,
        // freeSolo:true,
        disableCloseOnSelect:true,
        disableClearable:true,
        includeInputInList:true,
        
        defaultValue: bairros.filter( (item) => bairrosSelecionados.indexOf(item.link) >= 0),
        renderOption:(props, option, {selected}) => {
            return (
            <li {...props} >
                <Checkbox 
                icon={props.icon}
                checkedIcon={props.checkedIcon}
                style={{marginRight:8}}
                checked={selected || bairrosSelecionados.indexOf(option.link) >= 0}
                value={option.link}
                />
                {option.nome_}
            </li>
            )},
        renderTags:(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option.nome_} {...getTagProps({ index })} />),
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
                    setBairrosSelecionados([])
                    handleParametros([])
                }else{
                    const b = v.map((ba) => ba.link);
                    setBairrosSelecionados(b);
                    handleParametros(b)
                }
            }
        },
    }
    
    return (

                <Autocomplete
                        {...bairrosProps}
                        id="bairro"
                        onClick={handleBairros()}
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
    bairrosSelecionados: [],
    isOpen: false
}
BairrosInput.propTypes = {
    handleParametros:PropTypes.func,
    bairrosSelecionados:PropTypes.arrayOf(PropTypes.string),
    icon:PropTypes.node,
    checkedIcon:PropTypes.node,
    isOpen:PropTypes.bool,
    bairros:PropTypes.arrayOf(PropTypes.object)
}


