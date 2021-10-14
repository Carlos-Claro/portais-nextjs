import React from "react";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css'


function onImageLoadError(imageSrc, _srcType, errorEvent) {
    console.error(`Could not load image at ${imageSrc}`, errorEvent); // eslint-disable-line no-console
  }
  

export default function MyLightbox(props){
    console.log(props.imageAtual)
    return (
        <Lightbox
        mainSrc={props.imagesLightbox[props.imageAtual]}
        nextSrc={props.imagesLightbox[(props.imageAtual + 1) % props.imagesLightbox.length]}
        prevSrc={
          props.imagesLightbox[(props.imageAtual + props.imagesLightbox.length - 1) % props.imagesLightbox.length]
        }
        
        onCloseRequest= {() => {props.setLightboxOpen(false)}}
        onMovePrevRequest={() => props.fotoAnterior()}
        onMoveNextRequest={() => props.fotoProxima()}
        imageTitle={props.titulosLightbox[props.imageAtual]}
        onImageLoadError={onImageLoadError}
          />
      )
}