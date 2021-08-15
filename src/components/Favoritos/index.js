import { SwipeableDrawer, Typography } from "@material-ui/core";
import React from "react";
import ApiService from "../../uteis/ApiService";
import Imoveis from "../Imoveis";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { handle } from '../../store/Favoritos/Favoritos.actions'

export default function Favoritos(props){
    const dispatch = useDispatch()
    const favoritos = useSelector(state => state.favoritos)
    const [imoveis,setImoveis] = React.useState([])
    const [alteraFav, setAlteraFav] = React.useState(false)
    React.useEffect(() => {
        if ( favoritos.length ){

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
                <Typography variant="h3" >Seus Favoritos: {favoritos.length}</Typography>
                <ul>
                    {imoveis.map( (imovel) => (
                        <>
                        <Imoveis 
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