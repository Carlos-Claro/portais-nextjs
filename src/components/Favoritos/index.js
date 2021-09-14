import { Badge, CircularProgress, IconButton, Paper, SwipeableDrawer, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import ApiService from "../../uteis/ApiService";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import ImovelLista from "../Imoveis/imovelLista";

export default function Favoritos(props){
    const dispatch = useDispatch()
    const favoritos = useSelector(state => state.favoritos)
    const [imoveis,setImoveis] = React.useState([])
    const [alteraFav, setAlteraFav] = React.useState(false)
    React.useEffect(() => {
        if ( favoritos.length && props.isOpen ){

            const item = new ApiService
            item.getFavoritos(favoritos).then((res) => {
                setImoveis(res)  
            });
        }
    },[props.isOpen, favoritos])
    
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
                <Paper elevation={6} sx={{m:2}}>
                    <Typography 
                        component="h3"  
                        variant="subtitle1"  
                        align="center"
                        sx={{p:"10px"}}
                        >Seus imóveis Favoritos: 
                    <IconButton
                        aria-label="Seus Favoritos" 
                        color="inherit" 
                        >
                        <Badge 
                        badgeContent={favoritos.length} 
                        color="success" >
                        <FavoriteIcon 
                            color={ ! favoritos.length ? "disabled" : "success"} />
                        </Badge>
                    </IconButton>
                    </Typography>
                </Paper>
                <ul>
                    {
                        ! imoveis.length
                        ? (
                            favoritos.length ? (
                                <Paper elevation={8} align="center" sx={{m:"10px"}} >
                                    <CircularProgress />
                                    <br />
                                    <Typography variant="caption"  align="center">
                                        Carregando seus imóveis favoritos
                                    </Typography>
                                </Paper>
                                ) : (
                                    <Paper elevation={8} align="center" sx={{m:"10px"}} >
                                        <Typography variant="caption">
                                            Ainda não curtiu nenhum imóvel,
                                            <br/> 
                                            Curta alguns imóveis e compare eles
                                        </Typography>
                                    </Paper>
                            )                           
                        )
                        : imoveis.map( (imovel) => (
                        <>
                        <ImovelLista
                        key={imovel._id} 
                        imovel={imovel} 
                        abaFavorito={true}
                        
                        />
                     </>) )}
                    
                </ul>
            </div>
        </SwipeableDrawer>
            
        </>
    )

}

Favoritos.defaultProps = {
    isOpen:false
}

Favoritos.propTypes = {
    handleToggle: PropTypes.func,
    isOpen:PropTypes.bool.isRequired,
}