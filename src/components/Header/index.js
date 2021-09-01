import React, { Suspense } from 'react';

import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Grid,
  Badge,
  Link,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import GitHubIcon from '@material-ui/icons/GitHub';
import HouseIcon from '@material-ui/icons/House';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { styled } from '@material-ui/core/styles';

import { ChatContent } from "../../../pages/chat/index";
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux';
import { setImoveis } from '../../store/Carregamento/Carregamento.actions';

import dynamic from 'next/dynamic'
const FiltroDinamico = dynamic(
  () => import('../Filtro'),
  {suspense:true}
  )
const MenuPrincipal  = dynamic(
  () => import('../MenuPrincipal'),
  {suspense:true}
)
const FavoritosDinamico = dynamic(
  () => import('../Favoritos'),
  {suspense:true}
)

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
  
  const dispatch = useDispatch()
  const favoritos = useSelector(state => state.favoritos)
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
    if (anchor == 'top' && ! open){
      dispatch(setImoveis())
    }
    
    setSwipeMenu({...swipeMenu,[anchor]:open});
  };
  const [chat, setChat] = React.useState(ChatContent);
  const [modalStatus, setModalStatus] = React.useState(false)
  
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
        { ! props.noFiltro ? (
          <IconButton 
          aria-label="Abre buscador" 
          color="inherit"  
          onClick={toggleDrawerMenu('top',true)}>
            <SearchIcon />
          </IconButton>
        ):(
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
          id="botao-opcao-options"
          aria-label="mais opções" 
          aria-controls="basic-menu-option"
          aria-expanded={openOptions ? 'true' : undefined}
          onClick={handleOpenOptions}
          color="inherit" 
        >
          <Badge 
          badgeContent={favoritos.length+chat.length} 
          color="success" >
              <MoreVertIcon />

          </Badge>
        </IconButton>
      </StyledToolbar>
      <MenuPrincipal handleToggle={acao => toggleDrawerMenu('left', acao)} isOpen={swipeMenu['left']} />
        <Menu 
            id="basic-menu-option"
            open={openOptions}
            onClose={handleCloseOptions}
            anchorEl={menu}
            MenuListProps={{
              'aria-labelledby': 'botao-opcao-options',
            }}
        >
        <MenuItem > 
          <IconButton 
            aria-label="Favoritos" 
            color="inherit" 
            onClick={toggleDrawerMenu('right',true)} >
            <Badge 
              badgeContent={favoritos.length} 
              color="success" >
              <FavoriteIcon color={ ! favoritos.length ? "disabled" : "success"} />
            </Badge>
          </IconButton>
        </MenuItem > 
        <MenuItem > 
          <IconButton
            aria-label="Login/cadastro" 
            color="inherit" 
          >
            <GitHubIcon />
          </IconButton>
        </MenuItem > 
        <MenuItem > 
          <IconButton
            aria-label="Conversas iniciadas" 
            color="inherit" 
            component={Link}
            href="chat"
          >
            <Badge 
              badgeContent={chat.length} 
              color="success" >
                <ChatBubbleOutlineIcon color={ ! chat.length ? "disabled" : "success"} /> 
            </Badge>
          </IconButton>       
        </MenuItem>
      </Menu>
      <Suspense fallback={`loading`} >
        <FiltroDinamico
          handleToggle={acao => toggleDrawerMenu('top',acao)} 
          isOpen={swipeMenu.top} 
          handleParametros={(tipo, valor) => props.handleParametros(tipo,valor)} 
          parametros={props.parametros}
          bairros={props.bairros}
          /> 
      </Suspense>
      <Suspense fallback={`loading`} >
        <FavoritosDinamico
          handleToggle={acao => toggleDrawerMenu('right',acao)} 
          isOpen={swipeMenu.right}
        />
      </Suspense>
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