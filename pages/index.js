import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Container from '@material-ui/core/Container';
import Lista from '../src/components/Lista';
import React, { Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from '../src/uteis/ScrollTop';

export default function Home() {

  const [parametros,setParametros] = React.useState({
    cidade_link: 'sao_jose_dos_pinhais_pr',
    imoveis_tipos_link: 'apartamento',
    tipo_negocio: 'venda'
  });
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

  return (
    <Fragment>
      <Container>
        <Header />
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



