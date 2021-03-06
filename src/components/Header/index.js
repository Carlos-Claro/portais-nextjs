import React, { Suspense } from 'react';

import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Grid,
  Badge,
  Link,
  Menu,
  MenuItem,
  Avatar
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
import { setImoveis, setToken } from '../../store/Carregamento/Carregamento.actions';
import Parametros from '../../mocks/parametros.json'

import FiltroDinamico from '../Filtro'
import MenuPrincipal from '../MenuPrincipal'
import FavoritosDinamico from '../Favoritos'

import { signIn, signOut, useSession } from "next-auth/react"
import { setParametros } from '../../store/Filtro/Filtro.actions';
import router from 'next/router';
import ApiService from '../../uteis/ApiService';

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
  const {data: session} = useSession()
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
  const [chat, setChat] = React.useState(0);
  const token = useSelector(state => state.carregamento.token)
  const chatCarregamento = useSelector(state => state.carregamento.chat)
  React.useEffect(() => {
    const item = new ApiService(token)
    item.ChatQtde().then(res => {
      setChat(res.qtde)})
  }, [chatCarregamento])


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

  const handleSignin = () => {
    handleCloseOptions()
    window.open('/auth/signin', '_blank')
  }
  const handleSignout = () => {
    dispatch(setParametros(Parametros))
    dispatch(setToken(false))
    signOut()
  }
  const [openDialog, setOpenDialog] = React.useState(false)

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
          aria-label="Lista de im??veis" 
          color="inherit" 
          href="/"
          >
            <HouseIcon />
          </IconButton>
        )
        }
        <IconButton 
          id="botao-opcao-options"
          aria-label="mais op????es" 
          aria-controls="basic-menu-option"
          aria-expanded={openOptions ? 'true' : undefined}
          onClick={handleOpenOptions}
          color="inherit" 
        >
          <Badge 
          badgeContent={favoritos.length+chat} 
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
        <MenuItem onClick={() => !session ? handleSignin() : handleSignout()}  > 

          <IconButton
            aria-label="Login/cadastro" 
            color="inherit"
            >
              {
                ! session 
                ? <GitHubIcon />
                : <Avatar alt={session.user.name} src={session.user.image} sx={{width:24, height:24 }} />
              }
          </IconButton>
              { ! session ? "Login" : "Sair"}
        </MenuItem > 
        <MenuItem onClick={toggleDrawerMenu('right',true)} >
          <IconButton 
            aria-label="Favoritos" 
            color="inherit" 
            >
            <Badge 
              badgeContent={favoritos.length} 
              color="success" >
              <FavoriteIcon color={ ! favoritos.length ? "disabled" : "success"} />
            </Badge>
          </IconButton>
        <p>Favoritos</p>
        </MenuItem > 
        <MenuItem 
            component={Link}
            href="chat"
        > 
          <IconButton
            aria-label="Conversas iniciadas" 
            color="inherit" 
            >
            <Badge 
              badgeContent={chat} 
              color="success" >
                <ChatBubbleOutlineIcon color={ ! chat ? "disabled" : "success"} /> 
            </Badge>
          </IconButton>       
                <p>Chat</p>
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