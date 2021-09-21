import React, { useEffect } from 'react';

import { Container, Box, Fab, Zoom, useScrollTrigger } from '@material-ui/core';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { useSelector, useDispatch } from 'react-redux';

import HeaderDinamico from '../src/components/Header'
import ListaDinamico from '../src/components/Lista'
import FooterDinamico from '../src/components/Footer'

import ApiService from '../src/uteis/ApiService';

import { setToken } from '../src/store/Carregamento/Carregamento.actions';
import { Auth } from '../src/uteis/Auth';
import { useSession } from 'next-auth/react';

// todo
// Verificar efetividade de dynamic no contexto 
// de carregamento mais rapido e dinamico, 
// testar carga com getserversideprops
// 

// import dynamic from 'next/dynamic'
// const HeaderDinamico = dynamic(
//   () => import('../src/components/Header'),
//   {
//     loading: () => (<Paper elevation={8} align="center" sx={{m:"10px"}} >
//                       <CircularProgress />
//                       <br />
//                       <Typography variant="caption"  align="center">
//                           Este site esta a caminho...
//                       </Typography>
//                   </Paper>),
//     ssr:true,
//     // suspense:true
//   }
// )
// const ListaDinamico = dynamic(
//   () => import('../src/components/Lista'),
//   {
//     loading: () => (<Paper elevation={8} align="center" sx={{m:"10px"}} >
//                       <CircularProgress />
//                       <br />
//                       <Typography variant="caption"  align="center">
//                           Buscando a lista de imóveis
//                       </Typography>
//                   </Paper>),
//     ssr:true,
//     // suspense:true
//   }
// )
// const FooterDinamico = dynamic(
//   () => import('../src/components/Footer'),
//   {
//     loading: () => (<Paper elevation={8} align="center" sx={{m:"10px"}} >
//                       <CircularProgress />
//                       <br />
//                       <Typography variant="caption"  align="center">
//                           Carregando rodapé
//                       </Typography>
//                   </Paper>),
//     ssr:true,
//     // suspense:true
//   }
// )

import jwt from 'jsonwebtoken'

/**
 * Inicia pagina de imóveis, filtra, busca data em store
 * 
 */
export default function Home() {
  const dispatch = useDispatch()
  const parametros = useSelector(state => state.parametros)
  const token = useSelector(state => state.carregamento.token)
  const {data: session} = useSession()
  useEffect(() => {
    if ( ! token ){
      const item = new ApiService
      item.Auth().then(res => dispatch(setToken(res.token)))
    }
  }, [])
  useEffect(() => {
    var infoToken = jwt.decode(token)
    if ( session && ! infoToken.islogin ){
      const item = new ApiService(token)
      item.AtualizaToken({email:session.user.email}).then(res => dispatch(setToken(res.token)))
    }
  }, [session])
  useEffect(() => {handleScroll()}, [parametros])
  const triggerScroll = useScrollTrigger({
    disableHysteresis:true,
    threshold:100
  })
  const handleScroll = (event) => {
    const anchor = ((event ? event.target.ownerDocument : false) || document).querySelector('#top');
    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth',block: 'center'});
    }
  };
  return (
    <>
      <Container>
        <HeaderDinamico />
        <ListaDinamico />
        <FooterDinamico />
      </Container>
      <Zoom in={triggerScroll}>
        <Box
          onClick={handleScroll}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </Box>
      </Zoom>
    </>
  );
}

