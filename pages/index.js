import React, { useEffect } from 'react';

import { Container } from '@material-ui/core';
import HeaderDinamico from '../src/components/Header'
import FooterDinamico from '../src/components/Footer'
import FiltroHome from '../src/components/Filtro/home';



/**
 * Inicia pagina de imóveis, filtra, busca data em store
 * 
 */
export default function Home() {
  
  return (
    <>
      <Container>
        <HeaderDinamico />
        <FiltroHome />
        <FooterDinamico />
      </Container>
      
    </>
  );
}

