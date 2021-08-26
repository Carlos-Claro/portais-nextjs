
import React from "react"
import TemporaryImage from '../../../public/images/naodisponivel.jpg'
import Image from 'next/image'
import { Button, Chip, Fade, Grid } from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const myLoader = ({src, width, quality}) => {
        return `${src}`

}

export default function ImagesNext(props){
  const [image, SetImage] = React.useState({
    src: TemporaryImage,
    alt: 'Imagem carregando',
    images: props.itens,
  });
  const [fadeImage, setFadeImage] = React.useState(true)
  const [imageAtual, setImageAtual] = React.useState(0)  

  return (
      <>
      <Fade in={fadeImage} timeout={800} >

          <Image
            src={image.images[0].arquivo !== '/images/naodisponivel.jpg' ? image.images[0].arquivo : TemporaryImage}
            layout="responsive"
            width={350}
            height={250}
            
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
}