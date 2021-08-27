import React from "react"
import { Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core"

import tiposMock from '../../mocks/tipos.json'

import { useDispatch, useSelector } from "react-redux"
import { getSelecionados } from "../../store/Filtro/Filtro.selectors"
import { handleFiltro } from "../../store/Filtro/Filtro.actions"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export function TiposSelect(props){
    const dispatch = useDispatch()
    const selecionados = useSelector(state => getSelecionados(state,'imoveis_tipos_link'))
    const handleParametros = (valor) => {
        console.log(valor.target.value);
        dispatch(handleFiltro('imoveis_tipos_link',valor.target.value));
    }
    return (
        <FormControl variant="standard" sx={{ m: 1, width:0.95 }}>
        <InputLabel id="tipos-label">Tipos de imóvel </InputLabel>
        <Select
          labelId="tipos-label"
          id="tipos-name"
          multiple
          value={selecionados}
          onChange={handleParametros}
          MenuProps={MenuProps}
          renderValue={(selected) => tiposMock.filter( (item) => selected.indexOf(item.id) >= 0)
                        .reduce((item, cur, idx) => item + (idx ? ', ' : '') + cur.plural, '')
                        }>
          {tiposMock.map((tipo) => (
            <MenuItem
              key={tipo.id}
              value={tipo.id}
            >
                <Checkbox checked={selecionados.indexOf(tipo.id) > -1} />
                <ListItemText primary={tipo.plural} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
}

