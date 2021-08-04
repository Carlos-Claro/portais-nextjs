import { Autocomplete, Checkbox, Chip, TextField } from "@material-ui/core"
import React from "react"



export default function TiposInput(props){
    
    const [selecionados, setSelecionados] = React.useState(props.selecionados)
    const [open,setOpen] = React.useState(false)
    
    const handle = (item) => (event) => {
        setSelecionados((Atuais) => {
            return [...Atuais, item]
          })
    }
    const handleParametros = (valor) => {
        props.handleParametros('imoveis_tipos_link',valor)
    }

    const Props = {
        options: tipos,
        getOptionLabel: (option) => option.descricao,
        multiple:true,
        open:open,
        disableCloseOnSelect:true,
        disableClearable:true,
        includeInputInList:true,
        
        defaultValue: tipos.filter( (item) => selecionados.indexOf(item.id) >= 0),
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
                    setSelecionados([])
                    handleParametros([])
                }else{
                    const b = v.map((ba) => ba.id);
                    setSelecionados(b);
                    handleParametros(b)
                }
            }
        },
    }
    
    return (

                <Autocomplete
                        {...Props}
                        id="tipo_imovel"
                        onClick={handle()}
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

const tipos = [
    {"id":"andar","descricao":"Andar","plural":"Andares","english":"Floor"},
    {"id":"apartamento","descricao":"Apartamento","plural":"Apartamentos","english":"Apartment"},
    {"id":"area","descricao":"\u00c1rea","plural":"\u00c1reas","english":"Area"},
    {"id":"barracao_galpao","descricao":"Barrac\u00e3o \/ Galp\u00e3o","plural":"Barrac\u00f5es e Galp\u00f5es","english":"Storage"},
    {"id":"casa","descricao":"Casa","plural":"Casas","english":"House"},
    {"id":"conjunto_comercial","descricao":"Conjunto Comercial","plural":"Conjuntos Comerciais","english":"Office"},
    {"id":"fazenda","descricao":"Fazenda","plural":"Fazendas","english":"Farm"},
    {"id":"flat","descricao":"Flat","plural":"Flats","english":"Flat"},
    {"id":"garagem","descricao":"Garagem","plural":"Garagens","english":"Garage"},
    {"id":"haras","descricao":"Haras","plural":"Haras","english":"HorseFarm"},
    {"id":"hotel","descricao":"Hotel","plural":"Hoteis","english":"Hotels"},
    {"id":"kitinete","descricao":"Kitinete","plural":"Kitinetes","english":"Studio"},
    {"id":"loft","descricao":"Loft","plural":"Lofts","english":"Lofts"},
    {"id":"loja","descricao":"Loja","plural":"Lojas","english":"Retail"},
    {"id":"lote_terreno","descricao":"Lote \/ Terreno","plural":"Lotes e Terrenos","english":"Land Lot"},
    {"id":"negocio_empresa","descricao":"Neg\u00f3cio\/ Empresa","plural":"Neg\u00f3cios e Empresas","english":"Business"},
    {"id":"outro","descricao":"Outro","plural":"Outros","english":"Other"},
    {"id":"ponto_comercial","descricao":"Ponto Comercial","plural":"Pontos Comerciais","english":"Office"},
    {"id":"pousada","descricao":"Pousada","plural":"Pousadas","english":"Hostel"},
    {"id":"predio","descricao":"Pr\u00e9dio","plural":"Pr\u00e9dios","english":"Building"},
    {"id":"salao","descricao":"Sal\u00e3o","plural":"Sal\u00f5es","english":"Salon"},
    {"id":"sitio_chacara","descricao":"S\u00edtio e Ch\u00e1cara","plural":"Sitios e Ch\u00e1caras","english":"Ranches"},
    {"id":"sobrado","descricao":"Sobrado","plural":"Sobrados","english":"Town home"}

]


