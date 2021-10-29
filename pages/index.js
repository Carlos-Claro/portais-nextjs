import React, { useEffect, useState } from 'react';

import { Container } from '@material-ui/core';
import HeaderDinamico from '../src/components/Header'
import FooterDinamico from '../src/components/Footer'
import FiltroHome from '../src/components/Filtro/home';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../src/store/Carregamento/Carregamento.actions';
import ApiService from '../src/uteis/ApiService';

import Loading from '../src/components/Loading'

/**
 * Inicia pagina de imóveis, filtra, busca data em store
 * 
 */
export default function Home() {
  const dispatch = useDispatch()
  const [home, setHome] = useState(<Loading />)
  const token = useSelector(state => state.carregamento.token)
  useEffect(() => {
    if ( ! token ){
      const item = new ApiService
      item.Auth().then(res => {
        dispatch(setToken(res.token))
        setHome(<FiltroHome />)
      })
    }else{
      setHome(<FiltroHome />)
    }
  }, [])
  return (
    <>
      <Container>
        <HeaderDinamico />
        {home}
        <FooterDinamico />
      </Container>
      
    </>
  );
}

