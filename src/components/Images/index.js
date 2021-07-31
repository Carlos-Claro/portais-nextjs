import { Button, Chip, Grid } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function Images(props){
    const [image, SetImage] = React.useState({
        src: 'https://icuritiba.com/imagens/naodisponivel.jpg',
        alt: 'Imagem carregando',
        images: props.itens,
        ativa:false,
    });
    const [imageAtual, SetImageAtual] = React.useState(0)
    const [height, setHeight] = React.useState(200)
    const fotoAnterior = () => {
      SetImageAtual((atual) => {
        if((atual-1) < 0 ){
          return image.images.length - 1;
        }
        return atual-1;
      })
    }
    const fotoProxima = () => {
      SetImageAtual((atual) => {
        if((atual+1) >= image.images.length ){
          return 0;
        }
        return atual+1;
      })
    }

    const setImages = () => {
      if ( image.images.length ){
        return (
          <>
          <CardMedia 
          key={image.images[imageAtual].id}
          component="img"
          sx={{
            height: height,
          }}
          src={image.images[imageAtual].arquivo}
          title={image.images[imageAtual].titulo}
          onClick={() => setHeight("auto")}
          />  
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Button onClick={() => fotoAnterior()}>
                <ArrowBackIosIcon />
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Chip label={`${image.images.length} images`}  />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => fotoProxima()}>
              <ArrowForwardIosIcon />
              </Button>
            </Grid>
          </Grid>
          </>
          
          );
          
        }else{
          return (
            <CardMedia 
            key={0}
            className="imagem-imovel"
            component="img"
          sx={{
            height: 200,
          }}
          image={image.src}
          title={image.alt}         
          />
          ) 
        }
      }

    return (
        <>
            {setImages()}
        </>
    );
}