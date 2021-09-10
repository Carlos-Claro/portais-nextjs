import React, { Suspense } from 'react';

import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Grid,
  Menu
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HouseIcon from '@material-ui/icons/House';
import { styled } from '@material-ui/core/styles';
import MenuPrincipal from '../MenuPrincipal';

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
export default function HeaderLogin(props){
  const [swipeMenu, setSwipeMenu] = React.useState({
    left: false,
    top:false,
    right:false
  });
  const toggleDrawerMenu = (anchor, open) => (event) => {
    handleCloseOptions()
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    
    setSwipeMenu({...swipeMenu,[anchor]:open});
  };
  const [menu, setMenu] = React.useState(null)
  const openOptions = Boolean(menu)
  const handleOpenOptions = (e) => {
    e.preventDefault()
    setMenu(e.currentTarget) 
  }
  const handleCloseOptions = () => {
    setMenu(null) 
  }
    return (
      <>
      <AppBar position="fixed" color="default">
        <StyledToolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="Abre menu" 
            sx={{ mr: 2 }} 
            onClick={toggleDrawerMenu('left',true)} >
            <MenuIcon />
          </IconButton>
          <Grid item sx={{ flexGrow: 1 }}>
            <img src="/images/tp_imoveiscuritiba.gif" height="auto" width="auto" />
          </Grid>
        
          <IconButton
          aria-label="Lista de imóveis" 
          color="inherit" 
          href="/"
          >
            <HouseIcon />
          </IconButton>
          
      </StyledToolbar>
      <MenuPrincipal handleToggle={acao => toggleDrawerMenu('left', acao)} isOpen={swipeMenu['left']} />
        
    </AppBar>    
  </>
    );
  }
