import { Box, Divider, Link, List, ListItem, ListItemButton, SwipeableDrawer } from "@material-ui/core";
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux";
import parametrosDefault from "../../mocks/parametros.json"
import { setParametros } from "../../store/Filtro/Filtro.actions";

export default function Menu(props){
    const dispatch = useDispatch()

    return (
        <SwipeableDrawer 
          variant="temporary"
          anchor="left" 
          open={props.isOpen}
          onClose={props.handleToggle(false)} 
          onOpen={props.handleToggle(true)}
        >
          <Box role="presentation" 
          onClick={props.handleToggle(false)}
          onKeyDown={props.handleToggle(false)}
          >
            <List component="nav">
              <ListItem>
                <img src="/images/tp_imoveiscuritiba.gif" height="50dp" sx={{ flexGrow: 1,  }}/>
              </ListItem>
              <Divider />
              <ListItemButton>
                <Link aria-label="Lista de imóveis Venda" color="inherit" underline="hover" onClick={(e) => dispatch(setParametros(parametrosDefault))}>
                  Imóveis à venda
                </Link>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <Link aria-label="Lista de imóveis aluguel" color="inherit" underline="hover" onClick={(e) => {
                  let p = parametrosDefault
                  p.tipo_negocio = 'locacao';
                  dispatch(setParametros(p))
                }}>
                  Imóveis para alugar
                </Link>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <Link aria-label="Lista de imobiliárias" color="inherit" href="imobiliarias" underline="hover">
                  Imobiliárias
                </Link>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <Link aria-label="Encontramos o imóvel para você" color="inherit" href="encontre" underline="hover">
                  Não Encontrei
                </Link>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <Link aria-label="Lista de imobiliárias" color="inherit" href="imobiliárias" underline="hover">
                  Imobiliárias
                </Link>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <Link aria-label="Estatisticas de valor " color="inherit" href="estatisticasvalor" underline="hover">
                  Estátisticas Valor
                </Link>
              </ListItemButton>
              <ListItemButton>
                <Link aria-label="Estatisticas de Portal " color="inherit" href="estatisticasportal" underline="hover">
                  Estátisticas Portal
                </Link>
              </ListItemButton>
              <Divider />
            </List>
          </Box>
        </SwipeableDrawer>
    )
}


Menu.defaultProps = {
  isOpen:false
}
Menu.propTypes = {
  handleToggle:PropTypes.func,
  isOpen:PropTypes.bool
}