import { Button, Chip, Fade, Grid } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function Images(props){
  const [image, SetImage] = React.useState({
    src: 'https://icuritiba.com/imagens/naodisponivel.jpg',
    alt: 'Imagem carregando',
    images: props.itens,
  });
  const [ativaImage, setAtivaImage] = React.useState(false)
  const [swipeStart, setSwipeStart] = React.useState(0);    
  const [fadeImage, setFadeImage] = React.useState(true)
  const [imageAtual, SetImageAtual] = React.useState(0)
  const [height, setHeight] = React.useState(200)
  const fotoAnterior = () => {
    setFadeImage(false);
    setTimeout(() => {
    SetImageAtual((atual) => {
        setFadeImage(true);
        if((atual-1) < 0 ){
          return image.images.length - 1;
        }
        return atual-1;
      })
    },500);
  }
  const fotoProxima = () => {
    setFadeImage(false);
    setTimeout(() => {
    SetImageAtual((atual) => {
        setFadeImage(true);
        if((atual+1) >= image.images.length ){
          return 0;
        }
        return atual+1;
        
      })
    },500)
  }  
  const setImages = () => {
    if ( image.images.length && ativaImage ){
      return (
        <>
        <Fade in={fadeImage} timeout={800}>
          <CardMedia 
          key={image.images[imageAtual].id}
          component="img"
          className={`image-${props.id_imovel}`}
          sx={{
            height: height,
          }}
          src={image.images[imageAtual].arquivo}
          title={image.images[imageAtual].titulo}
          onClick={() => setHeight("auto")}
          onTouchStart={(e) => setSwipeStart(e.changedTouches[0].pageX)}
          onTouchEnd={(e) => {
            if ( e.changedTouches[0].pageX < swipeStart ){
              fotoProxima()
            }else{
              fotoAnterior()
            }
          }}
          />  
        </Fade>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Button onClick={() => fotoAnterior()}>
              <ArrowBackIosIcon />
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Chip label={`foto ${imageAtual+1} de ${image.images.length} images`}  />
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
          className={`image-${props.id_imovel}`}
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


    const elemento = () => `.image-${props.id_imovel}`;
    
    React.useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
          
            if ( entries.some(entry => entry.isIntersecting) ){
              setAtivaImage(true)
            }
        })
        intersectionObserver.observe(document.querySelector(elemento()))
        return () => intersectionObserver.disconnect()
    }, [])

  return (
      <>
          {setImages()}
      </>
  );
}