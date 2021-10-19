import React, { useEffect } from "react";

import { 
  Avatar
  , Collapse
  , Card
  , CardActions
  , CardContent
  , CardHeader
  , IconButton
  , Grid
  , Chip,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography
 } from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BedIcon from '@material-ui/icons/Bed';
import BathtubIcon from '@material-ui/icons/Bathtub';
import DirectionsCarFilledIcon from '@material-ui/icons/DirectionsCarFilled';
import PinDropIcon from '@material-ui/icons/PinDrop';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { handle } from "../../store/Favoritos/Favoritos.actions";
import { Descricao } from "./descricao";
import OpcoesMenu from "./opcoesMenu";
import Images from "../Images";
import ApiService from "../../uteis/ApiService";
import { Box } from "@material-ui/system";
import Mapas from "./mapaImovelLoad";
import Logradouro from "./logradouro";
import Imobiliaria from "../Imobiliaria";



export default function ImovelItem(props){
  console.log(props.imovel)
    const [value, setValue] = React.useState(0);
  const dispatch = useDispatch()
  const isFavorito = useSelector(state => state.favoritos.indexOf(props.imovel._id) === -1)
  const [menu, setMenu] = React.useState(null);
  const token = useSelector(state => state.carregamento.token)
  const [imobiliaria, setImobiliaria] = React.useState(false)
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if ( entries.some(entry => entry.isIntersecting) ){
        const item = new ApiService(token)
        item.RegistraLog(props.imovel._id, 'ficha').then((res) => {})
      }
  })
  intersectionObserver.observe(document.querySelector(`#imovel-${props.imovel._id}`))
  return () => intersectionObserver.disconnect()
}, [])
useEffect(() => {
    const intersectionObserver_imobi = new IntersectionObserver(entries => {
      if ( entries.some(entry => entry.isIntersecting) && ! imobiliaria){
        const item = new ApiService(token)
        item.GetImobiliaria(props.imovel.id_empresa).then((res) => {
          setImobiliaria(res)
        })
      }
    })
    intersectionObserver_imobi.observe(document.querySelector(`#imobiliaria`))
    return () => intersectionObserver_imobi.disconnect()
  }, [])

  return (
    <>  
        <Card className={props.className} key={`imovel-${props.imovel._id}`} id={`imovel-${props.imovel._id}`} >
          <CardHeader
          avatar={
            <Avatar 
            arial-label={props.imovel.imobiliaria_nome} 
            src={`https://pow.com.br/powsites/${props.imovel.id_empresa}/${props.imovel.logo}`} 
            sx={{width:64, height:64  }}
            />
          } 
          title={`${props.imovel.nome}`}
          subheader={`${props.imovel.bairro}, ${props.imovel.cidade} - ${props.imovel.estado}`}
          wrapped="true"
          />
          <Images itens={props.imovel.images} id_imovel={props.imovel._id} abaFavorito={props.abaFavorito}/>
          <CardContent>
          <Box style={{
                display: Grid,
                gridTemplateColumns: "1fr",
            }}>
            {props.imovel.preco_venda ? <Chip style={{margin:"5px"}} variant="outlined" color="success" size="medium" icon={<AttachMoneyIcon />} label={`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.imovel.preco_venda)}`} /> : ''}
            {props.imovel.preco_locacao ? <Chip style={{margin:"5px"}} variant="outlined" color="success" size="medium" icon={<AttachMoneyIcon />} label={`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.imovel.preco_locacao)}`} /> : ''}
            {props.imovel.quartos ? <Chip style={{margin:"5px"}} variant="outlined" color="primary" size="small" icon={<BedIcon />} label={`${props.imovel.quartos}`} /> : ''}
            {props.imovel.banheiros ? <Chip style={{margin:"5px"}} variant="outlined" color="primary" size="small" icon={<BathtubIcon />} label={`${props.imovel.banheiros}`} /> : ''}
            {props.imovel.garagens ? <Chip style={{margin:"5px"}} variant="outlined" color="primary" size="small" icon={<DirectionsCarFilledIcon />} label={`${props.imovel.garagens}`} /> : ''}
            </Box>
            <Descricao imovel={props.imovel} />
            {
              (props.imovel.location && props.imovel.location.length > 0 && props.imovel.latitude) && <Mapas lat={props.imovel.location[1]} lng={props.imovel.location[0]} />
            }
            <Logradouro endereco={props.imovel.logradouro} numero={props.imovel.numero} bairro={props.imovel.bairro} cidade={props.imovel.cidade} />
            <div id="imobiliaria">
            {
              imobiliaria ? <><Typography>Imobiliária:</Typography><Divider /><Imobiliaria imobiliaria={imobiliaria.itens[0]} component="div" /></> : ''
            }
            </div>

            <Typography>
            As informações estão sujeitas a alterações. Consulte o corretor responsável.
            <br />
            Atualizado em: {props.imovel.data_atualizacao}
            </Typography>
          </CardContent>
        </Card>

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                >
                <BottomNavigationAction label="Compartilhar" icon={<ShareIcon />} />
                <BottomNavigationAction label="Favoritar" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Localização" icon={<PinDropIcon />} />
                </BottomNavigation>
            </Paper>

      </>
      );
}

ImovelItem.defaultPropr = {
  abaFavorito: false
}

ImovelItem.propTypes = {
  imovel:PropTypes.object,
  abaFavorito:PropTypes.bool,
  className:PropTypes.string
}