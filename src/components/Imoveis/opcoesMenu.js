import { Divider, IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function OpcoesMenu(props){

    const handleExpandClick = () => {
        props.handleCloseOptions()
        props.handleExpandClick()
    }
    return (<>
        <IconButton 
          id="botao-opcao"
          aria-label="mais informações" 
          aria-controls="basic-menu"
          aria-expanded={props.open ? 'true' : undefined}
          onClick={props.handleClickOptions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu 
          id="basic-menu"
          anchorEl={props.menu}
          open={props.open}
          onClose={props.handleCloseOptions}
          MenuListProps={{
            'aria-labelledby': 'botao-opcao',
          }}
        >
          <MenuItem onClick={handleExpandClick} noWrap>Mais sobre este imóvel</MenuItem>
          <Divider />
          <MenuItem onClick={props.handleCloseOptions}>Whatsapp</MenuItem>
          <MenuItem onClick={props.handleCloseOptions}>Contato</MenuItem>
          <Divider />
          <MenuItem onClick={props.handleCloseOptions}>Sobre a {props.imobiliaria}</MenuItem>
        </Menu>
        </>)
}

