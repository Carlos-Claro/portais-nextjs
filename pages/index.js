import React from 'react';


import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Container from '@material-ui/core/Container';
import Lista from '../src/components/Lista';
import Fab from '@material-ui/core/Fab';
import { Box, Zoom } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import ApiService from '../src/uteis/ApiService';

export default function Home() {

  
  const [paginaAtual, setPaginaAtual] = React.useState(1)

  const [parametros,setParametros] = React.useState({
    cidade_link: 'sao_jose_dos_pinhais_pr',
    imoveis_tipos_link: ['apartamento'],
    tipo_negocio: 'venda',
    bairros_link: []
  });
  const handleParametros = (tipo,valor) => {
    setParametros({...parametros, [tipo]:valor})
    setPaginaAtual(1)
    handleScroll()
  }


  const [bairros,setBairros] = React.useState([])
  React.useEffect(() => {
      const api = new ApiService;
          api.GetBairros(parametros.cidade_link).then( (resposta) => setBairros(resposta.itens) )
  },[])


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
          handleParametros={(tipo,valor) => handleParametros(tipo,valor)} 
          parametros={parametros} 
          bairros={bairros} 
          />
        <Lista 
          parametros={parametros} 
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



