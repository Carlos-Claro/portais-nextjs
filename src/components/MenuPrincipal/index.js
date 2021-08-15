import { Box, Divider, Link, List, ListItem, ListItemButton, SwipeableDrawer } from "@material-ui/core";
import PropTypes from 'prop-types'

export default function Menu(props){
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
                <img src="https://icuritiba.com/imagens/tp_imoveiscuritiba.gif" height="50dp" sx={{ flexGrow: 1,  }}/>

              </ListItem>
              <Divider />
              <ListItemButton>
                <Link aria-label="Lista de imóveis" color="inherit" href="/" underline="hover">
                  Imóveis
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
                <Link aria-label="Encontramos o imóvel para você" color="inherit" href="nao_encontrei" underline="hover">
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
                <Link aria-label="Estatisticas de valor " color="inherit" href="estatisticas_valor" underline="hover">
                  Estátisticas Valor
                </Link>
              </ListItemButton>
              <ListItemButton>
                <Link aria-label="Estatisticas de Portal " color="inherit" href="estatisticas_portal" underline="hover">
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