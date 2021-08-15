import React from "react";

export const Favoritos = (requisicao) => {
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
  return requisicao;
}






