import React, { useEffect } from 'react';

import Header from '../src/components/Header'
import Container from '@material-ui/core/Container';

import Fab from '@material-ui/core/Fab';
import { Box, Zoom } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


import { useDispatch, useSelector } from 'react-redux';
import { handleFiltro } from '../src/store/Filtro/Filtro.actions';


import dynamic from 'next/dynamic'
const ListaDinamico = dynamic(
  () => import('../src/components/Lista'),
  {
    loading: () => <p >loading...</p>,
    ssr:true
  }
)

const FooterDinamico = dynamic(
  () => import('../src/components/Footer'),
  {
    loading: () => <p >loading...</p>,
    ssr:true
  }
)


export default function Home() {
  const dispatch = useDispatch()
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
        <Header />
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



