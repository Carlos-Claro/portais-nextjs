import { Button, Chip, Fade, Grid } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TemporaryImage from '../../../public/images/naodisponivel.jpg'
import Image from 'next/image'
import PropTypes from 'prop-types'


export default function Images(props){
  
  const [image, SetImage] = React.useState({
    src: TemporaryImage,
    alt: 'Imagem carregando',
    images: props.itens,
  });
  const [ativaImage, setAtivaImage] = React.useState(false)
  const [swipeStart, setSwipeStart] = React.useState(0);    
  const [fadeImage, setFadeImage] = React.useState(true)
  const [imageAtual, SetImageAtual] = React.useState(0)
  const [height, setHeight] = React.useState(200)
  const [layout, setLayout] = React.useState("responsive")
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
    if ( image.images.length && ( ativaImage || props.abaFavorito ) ){
      return (
        <>
          <Image 
          key={image.images[imageAtual].id}
          className={`image-${props.id_imovel}`}
          width={300}
          height={height}
          sx={{height:height, width:"auto", display:"block", margin:"auto" }}
          layout={layout}
          objectFit="cover"
          placeholder="blur"
          priority={true}
          quality={90}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 200))}`}
          src={(image.images[imageAtual].arquivo).replace('650F_','')}
          title={image.images[imageAtual].titulo}
          onClick={() => setLayout("responsive")}
          onTouchStart={(e) => setSwipeStart(e.changedTouches[0].pageX)}
          onTouchEnd={(e) => {
            if ( e.changedTouches[0].pageX < swipeStart ){
              fotoProxima()
            }else{
              fotoAnterior()
            }
          }}
          />  
        
        <Grid container spacing={2} sx={{
          position: "relative",
          top:"-50px",
          display: "inline-grid",
          gridTemplateColumns: "1fr 1fr 1fr"
        }}>
          <Grid item sx={{
            textAlign:"left",
          }} >
            <Button onClick={() => fotoAnterior()}>
              <ArrowBackIosIcon />
            </Button>
          </Grid>
          <Grid item sx={{
            textAlign:"center",
          }}>
            <Chip label={`foto ${imageAtual+1} de ${image.images.length} images`}  color="primary" />
          </Grid>
          <Grid item sx={{
            textAlign:"right",
          }}>
            <Button onClick={() => fotoProxima()}>
            <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
        </>
        
        );
        
      }else{
        return (
          <Image 
          key={0}
          className={`image-${props.id_imovel}`}
          component="img"
        sx={{
          height: 200,
        }}
        src={image.src}
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

Images.defaultProps = {
  abaFavorito: false
}

Images.propTypes = {
  itens:PropTypes.arrayOf(PropTypes.object),
  id_imovel:PropTypes.number,
  abaFavorito:PropTypes.bool
}

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
