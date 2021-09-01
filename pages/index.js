import React, { useEffect } from 'react';

import Header from '../src/components/Header'
import Container from '@material-ui/core/Container';

import Fab from '@material-ui/core/Fab';
import { Box, Paper, Typography, Zoom, CircularProgress } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { useSelector } from 'react-redux';

import HeaderDinamico from '../src/components/Header'
import ListaDinamico from '../src/components/Lista'
import FooterDinamico from '../src/components/Footer'

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


export default function Home() {
  const parametros = useSelector(state => state.parametros)
  useEffect(() => {
    handleScroll()
  }, [parametros])
  const triggerScroll = useScrollTrigger({
    disableHysteresis:true,
    threshold:100
  })
  const handleScroll = (event) => {
    
    const anchor = ((event ? event.target.ownerDocument : false) || document).querySelector(
      '#top',
    );
      
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
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



