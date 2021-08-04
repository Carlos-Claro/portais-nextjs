import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Container from '@material-ui/core/Container';
import Lista from '../src/components/Lista';
import React, { Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from '../src/uteis/ScrollTop';
import ApiService from '../src/uteis/ApiService';

export default function Home() {

  const [parametros,setParametros] = React.useState({
    cidade_link: 'sao_jose_dos_pinhais_pr',
    imoveis_tipos_link: 'apartamento',
    tipo_negocio: 'venda',
    bairros_link: ['afonso_pena']
  });
  const handleParametros = (tipo,valor) => {
    setParametros({...parametros, [tipo]:valor})
  }
  
  const [favoritos, setFavoritos] = React.useState([]);
  const handleFavoritos = (favorito) => {
    setFavoritos((favoritosAtuais) => {
      if (favoritosAtuais.indexOf(favorito) === -1){
        return [...favoritosAtuais, favorito]
      }else{
        const fav = favoritosAtuais.slice()
        fav.splice(favoritosAtuais.indexOf(favorito),1)
        return fav
      }
    })
  }


  const [bairros,setBairros] = React.useState([])
  React.useEffect(() => {
      const api = new ApiService;
          api.GetBairros(parametros.cidade_link).then( (resposta) => setBairros(resposta.itens) )
  },[])


  return (
    <Fragment>
      <Container>
        <Header handleParametros={(tipo,valor) => handleParametros(tipo,valor)} parametros={parametros} bairros={bairros} />
        <Lista parametros={parametros} favoritos={favoritos}  clickFavorito={favorito => handleFavoritos(favorito)} />
        <Footer />
      </Container>
      <ScrollTop >
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Fragment>
  );
}



