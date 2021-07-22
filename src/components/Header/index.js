
import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Grid,
  SwipeableDrawer,
  Menu,
  Box,
  List,
  ListItem,
  Link,
  Divider,
  ListItemButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { styled } from '@material-ui/core/styles';
import React from 'react';

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
  const [swipe, setSwipe] = React.useState({left:false});
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      setSwipe({...swipe,[anchor]:open});
    };
    return (
      <>
      <AppBar position="fixed" color="default">
        <StyledToolbar>
          <IconButton edge="start" color="inherit" aria-label="Abre menu" sx={{ mr: 2 }} onClick={toggleDrawer("left", true)} >
            <MenuIcon />
          </IconButton>
          <Grid item sx={{ flexGrow: 1 }}>
            <img src="https://icuritiba.com/imagens/tp_imoveiscuritiba.gif" height="35dp" sx={{ flexGrow: 1 }}/>
          </Grid>
          <IconButton aria-label="Buscador" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="mais informações" color="inherit" edge="end">
            <MoreIcon />
          </IconButton>
        </StyledToolbar>
        <SwipeableDrawer 
          variant="temporary"
          anchor="left" 
          open={swipe["left"]}
          onClose={toggleDrawer("left", false)} 
          onOpen={toggleDrawer("left", true)}
        >
          <Box role="presentation" onClick={toggleDrawer('left',false)} onKeyDown={toggleDrawer('left',false)}>
            <List component="nav">
              <ListItem>
                <img src="https://icuritiba.com/imagens/tp_imoveiscuritiba.gif" height="50dp" sx={{ flexGrow: 1,  }}/>

              </ListItem>
              <Divider />
              <ListItemButton>
                <Link aria-label="Lista de imóveis" color="inherit" href="imoveis" underline="hover">
                  Imóveis
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
            </List>
          </Box>
        </SwipeableDrawer>
      </AppBar>
      
      </>

  
    );
  }

  