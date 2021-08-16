
import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Grid,
  Badge,
  Link,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import GitHubIcon from '@material-ui/icons/GitHub';
import HouseIcon from '@material-ui/icons/House';

import { styled } from '@material-ui/core/styles';
import React from 'react';
import MenuPrincipal from '../MenuPrincipal';
import Filtro from '../Filtro';
import Favoritos from '../Favoritos';
import { ChatContent } from "../../../pages/chat/index";
import PropTypes from 'prop-types'


import { useSelector } from 'react-redux';

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
  
  const favoritos = useSelector(state => state.favoritos)
  

  const [swipeMenu, setSwipeMenu] = React.useState({
    left: false,
    top:false,
    right:false
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
  const [chat, setChat] = React.useState(ChatContent);
  const [modalStatus, setModalStatus] = React.useState(false);
  
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
            <img src="https://icuritiba.com/imagens/tp_imoveiscuritiba.gif" height="35dp" sx={{ flexGrow: 1 }}/>
          </Grid>
        
        { ! props.noFiltro ? (
          <IconButton 
          aria-label="Abre buscador" 
          color="inherit"  
          onClick={toggleDrawerMenu('top',true)}>
            <SearchIcon />
          </IconButton>
        )
        : (
          <IconButton
          aria-label="Lista de imóveis" 
          color="inherit" 
          href="/"
          >
            <HouseIcon />
          </IconButton>
        )
        }
        
          <IconButton 
          aria-label="mais informações" 
          color="inherit" 
          onClick={toggleDrawerMenu('right',true)} >
            <Badge 
              badgeContent={favoritos.length} 
              color="success" >
              <FavoriteIcon 
                color={ ! favoritos.length ? "disabled" : "success"} />
            </Badge>
          </IconButton>
          <IconButton
          aria-label="Login/cadastro" 
          color="inherit" 
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
          aria-label="Conversas iniciadas" 
          color="inherit" 
          edge="end" 
          component={Link}
          href="chat"
          >
            <Badge 
              badgeContent={chat.length} 
              color="success" >
                <ChatBubbleOutlineIcon color={ ! chat.length ? "disabled" : "success"} /> 
               </Badge>
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
        
        <Favoritos 
        
        handleToggle={acao => toggleDrawerMenu('right',acao)} 
        isOpen={swipeMenu.right}
        
        />
      

      </AppBar>
      
      </>

  
    );
  }

  Header.propDefaults = {
    noFiltro:false,
  }

  Header.propTypes = {
    handleParametros:PropTypes.func,
    noFiltro:PropTypes.bool,
    parametros:PropTypes.object,
    bairros:PropTypes.arrayOf(PropTypes.object),
    
  }