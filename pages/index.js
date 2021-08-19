import React, { useEffect } from 'react';


import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Container from '@material-ui/core/Container';
import Lista from '../src/components/Lista';
import Fab from '@material-ui/core/Fab';
import { Box, Zoom } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import ApiService from '../src/uteis/ApiService';

import { useDispatch, useSelector } from 'react-redux';
import { handleFiltro } from '../src/store/Filtro/Filtro.actions';


export default function Home() {
  const dispatch = useDispatch()
  const [paginaAtual, setPaginaAtual] = React.useState(1)
  const parametros = useSelector(state => state.parametros)
  useEffect(() => {
    setPaginaAtual(1)
    handleScroll()
  }, [parametros])

  const handleParametros = (tipo,valor) => {
    dispatch(handleFiltro(tipo,valor))
  }


  const [bairros,setBairros] = React.useState([])
  React.useEffect(() => {
      const api = new ApiService;
          api.GetBairros(parametros.cidade_link ? parametros.cidade_link : 'curitiba_pr').then( (resposta) => setBairros(resposta.itens) )
  },[parametros.cidade_link])


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
        <Header 
          bairros={bairros} 
          />
        <Lista 
          handlePaginaAtual={pagina => setPaginaAtual(pagina)}
          paginaAtual={paginaAtual}
          />
        <Footer />
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



