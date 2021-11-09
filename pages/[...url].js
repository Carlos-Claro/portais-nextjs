import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Home from ".";
import { setURL } from "../src/store/Filtro/Filtro.actions";


import { Container, Box, Fab, Zoom, useScrollTrigger } from '@material-ui/core';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { useSelector, useDispatch } from 'react-redux';

import HeaderDinamico from '../src/components/Header'
import ListaDinamico from '../src/components/Lista'
import FooterDinamico from '../src/components/Footer'

import ApiService from '../src/uteis/ApiService';

import { setToken } from '../src/store/Carregamento/Carregamento.actions';

import { useSession } from 'next-auth/react';
import jwt from "jsonwebtoken";
import MyHead from "../src/components/Head";

export default function URL(){
  const dispatch = useDispatch()
  const router = useRouter()
  const carregamento = useSelector(state => state.carregamento)
  const parametros = useSelector(state => state.parametros)
  const token = useSelector(state => state.carregamento.token)
  const {data: session} = useSession()
  // busca token, para iniciar processamento
  useEffect(() => {
    if ( ! token ){
      const item = new ApiService
      item.Auth().then(res => dispatch(setToken(res.token)))
    }
  }, [])
  // atualiza token, quando logado
  useEffect(() => {
    var infoToken = jwt.decode(token)
    if ( session && ! infoToken.islogin ){
      const item = new ApiService(token)
      item.AtualizaToken({email:session.user.email}).then(res => dispatch(setToken(res.token)))
    }
  }, [session])
  // rolagem para o topo
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
  // carrega primeira poesquisa, quando rota ok
  const [home, setHome] = useState('')
  useEffect(() => {
    if ( router.isReady ) {
      dispatch(setURL(router.query['url'][0]))
      setHome()
    }
  }, [router.isReady])  

  return (
    <>
      <MyHead />
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
  )
}