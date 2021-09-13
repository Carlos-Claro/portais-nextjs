import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSelecionados } from "../../store/Filtro/Filtro.selectors"
import { handleFiltro } from "../../store/Filtro/Filtro.actions"

import BairrosMock from "../../mocks/bairros/curitiba_pr.json"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export function BairrosSelect(){
    const dispatch = useDispatch()
    const selecionados = useSelector(state => getSelecionados(state,'bairros_link'))
    const handleParametros = (valor) => {
        dispatch(handleFiltro('bairros_link',valor.target.value));
    }
    return (
        <FormControl variant="standard" sx={{ m: 1, width:0.95 }}>
        <InputLabel id="bairros-label">Encontre por bairros </InputLabel>
        <Select
          labelId="bairros-label"
          id="bairros-name"
          multiple
          value={selecionados}
          onChange={handleParametros}
          MenuProps={MenuProps}
          renderValue={(selected) => BairrosMock.filter( (item) => selected.indexOf(item.id) >= 0)
                        .reduce((item, cur, idx) => item + (idx ? ', ' : '') + cur.descricao, '')
                        }>
          {BairrosMock.map((tipo) => (
            <MenuItem
              key={tipo.id}
              value={tipo.id}
            >
                <Checkbox checked={selecionados.indexOf(tipo.id) > -1} />
                <ListItemText primary={tipo.descricao} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
}
export async function getServerSideProps(){
  const data = []
  return { props: { data } }
}