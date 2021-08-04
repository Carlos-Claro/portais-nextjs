
import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { styled } from '@material-ui/core/styles';
import React from 'react';
import MenuPrincipal from '../MenuPrincipal';
import Filtro from '../Filtro';

const logo = '';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
      minHeight: 50,
  },

}));



export default function Header(props){
  const [swipeMenu, setSwipeMenu] = React.useState({
    left: false,
    top:false
  });
  const toggleDrawerMenu = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setSwipeMenu({...swipeMenu,[anchor]:open});
  };
  

    return (
      <>
      <AppBar position="fixed" color="default">
        <StyledToolbar>
          <IconButton edge="start" color="inherit" aria-label="Abre menu" sx={{ mr: 2 }} onClick={toggleDrawerMenu('left',true)} >
            <MenuIcon />
          </IconButton>
          <Grid item sx={{ flexGrow: 1 }}>
            <img src="https://icuritiba.com/imagens/tp_imoveiscuritiba.gif" height="35dp" sx={{ flexGrow: 1 }}/>
          </Grid>
          <IconButton aria-label="Abre buscador" color="inherit"  onClick={toggleDrawerMenu('top',true)}>
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="mais informações" color="inherit" edge="end">
            <MoreIcon />
          </IconButton>
          
          

        </StyledToolbar>
        <MenuPrincipal handleToggle={acao => toggleDrawerMenu('left', acao)} isOpen={swipeMenu['left']} />
        <Filtro 
            handleToggle={acao => toggleDrawerMenu('top',acao)} 
            isOpen={swipeMenu.top} 
            handleParametros={(tipo, valor) => props.handleParametros(tipo,valor)} 
            parametros={props.parametros}
            bairros={props.bairros}
            /> 
      </AppBar>
      
      </>

  
    );
  }

  