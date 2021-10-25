import React, { useEffect } from 'react';

import { Container } from '@material-ui/core';
import HeaderDinamico from '../src/components/Header'
import FooterDinamico from '../src/components/Footer'
import FiltroHome from '../src/components/Filtro/home';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../src/store/Carregamento/Carregamento.actions';
import ApiService from '../src/uteis/ApiService';



/**
 * Inicia pagina de imóveis, filtra, busca data em store
 * 
 */
export default function Home() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.carregamento.token)
  useEffect(() => {
    if ( ! token ){
      const item = new ApiService
      item.Auth().then(res => dispatch(setToken(res.token)))
    }
  }, [])
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

