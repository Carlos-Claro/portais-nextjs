import { CardMedia } from "@material-ui/core";
import { Padding } from "@material-ui/icons";
import React from "react"

export default function Images(props){
    const [image, SetImage] = React.useState({

        src: 'https://icuritiba.com/imagens/naodisponivel.jpg',
        alt: 'Imagem carregando',
        images: props.itens,
    }
    );
    const setImages = () => {
        if ( image.images.length ){
          return (
          <CardMedia
          sx={{
            height: 0,
            paddingTop: '56.25%',
          }}
          image={image.images[0].arquivo}
          title={image.images[0].titulo}
          />
          );
          
        }else{
          return (
            <CardMedia
          sx={{
            height: 0,
            paddingTop: '56.25%',
          }}
          image={image.src}
          title={image.alt}
          />
          ) 
        }
      }

    return (
        <div>
            {setImages()}
        </div>
    );
}