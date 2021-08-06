import { SwipeableDrawer, Typography } from "@material-ui/core";
import React from "react";
import ApiService from "../../uteis/ApiService";
import Imoveis from "../Imoveis";

export default function Favoritos(props){
    const [imoveis,setImoveis] = React.useState([])
    const [alteraFav, setAlteraFav] = React.useState(false)
    React.useEffect(() => {
        if ( props.favoritos.length ){

            const item = new ApiService
            item.getFavoritos(props.favoritos).then((res) => {
                setImoveis(res)  
            });
        }
    },[props.isOpen, alteraFav])
    const handleFavoritos = (favorito) =>  {
        setAlteraFav(!alteraFav)
        props.handleFavoritos(favorito)
    }
    return (
        <>
        <SwipeableDrawer 
          anchor="right" 
          open={props.isOpen}
          onClose={props.handleToggle(false)} 
          onOpen={props.handleToggle(true)}
          sx={{
              marginTop:"70px"
          }}
        >
            <div sx={{
                marginTop:"70px",
                width:"95%"
            }}>
                <Typography variant="h3" >Seus Favoritos: {props.favoritos.length}</Typography>
                <ul>
                    {imoveis.map( (imovel) => (
                        <>
                        <Imoveis 
                        key={imovel._id} 
                        imovel={imovel} 
                        isFavorito={props.favoritos.indexOf(imovel._id) === -1} 
                        handleFavorito={(favorito) => handleFavoritos(favorito)}
                        abaFavorito={true}
                        />
                     </>) )}
                    
                </ul>

            </div>
        </SwipeableDrawer>
            
        </>
    )

}