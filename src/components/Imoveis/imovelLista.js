import React, { useEffect, useState } from "react";

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
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
import { useSession } from "next-auth/react";
import MyDialog from '../Dialog'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ImovelLista(props){
  console.log(props)
  const link_imovel = process.env.NEXT_PUBLIC_URL + `imovel/${props.imovel.nome}/${props.imovel._id}`
  const dispatch = useDispatch()
  const isFavorito = useSelector(state => state.favoritos.indexOf(props.imovel._id) === -1)
  const [menu, setMenu] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const open = Boolean(menu);
  const handleClickOptions = (event) => {
    event.preventDefault()
    setMenu(event.currentTarget);
  }
  const token = useSelector(state => state.carregamento.token)
  const handleCloseOptions = () => setMenu(null)
  const handleExpandClick = () => {
    if ( ! expanded ){
      const item = new ApiService(token)
            item.RegistraLog(props.imovel._id, 'ficha').then((res) => {})
    }
    setExpanded(!expanded)
  }
  const {data: session} = useSession()
  const [openDialog, setOpenDialog] = React.useState(false)
  const handleWhats = (fechaDialog) => {
    if(fechaDialog){
      setOpenDialog(false)
    }
    const item = new ApiService(token)
      item.RegistraLog(props.imovel._id, 'ligacao-whatsapp').then((res) => {
        const uri = encodeURI('Gostaria de mais informações sobre o imóvel: ' + link_imovel)
        const uriWhats = `https://wa.me/55${props.imovel.imobiliaria_whatsapp}?text=${uri}`
        window.open(uriWhats,'_blank')
      })
  }
  const clickWhats = () => {
    handleCloseOptions()
    if (session){
       handleWhats(false)
    }else{
      setOpenDialog(true)
    }

  }
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if ( entries.some(entry => entry.isIntersecting) ){
        console.log(props.imovel._id)
        const item = new ApiService(token)
            item.RegistraLog(props.imovel._id, 'lista').then((res) => {})
      }
  })
  intersectionObserver.observe(document.querySelector(`#imovel-${props.imovel._id}`))
  return () => intersectionObserver.disconnect()
  }, [])

  return (
    <>
        <Card component="li" className={props.className} key={`imovel-${props.imovel._id}`} id={`imovel-${props.imovel._id}`} >
          <CardHeader
          avatar={
            <Avatar 
            arial-label={props.imovel.imobiliaria_nome} 
            src={`https://pow.com.br/powsites/${props.imovel.id_empresa}/${props.imovel.logo}`} 
            sx={{width:36, height:36  }}
            />
          } 
          action={<OpcoesMenu 
            handleClickOptions={(e) => handleClickOptions(e)} 
            handleCloseOptions={() => handleCloseOptions()} 
            clickWhats={() => clickWhats()}
            open={open} 
            menu={menu} 
            imobiliaria={props.imovel.imobiliaria_nome}
            id_imovel={props.imovel._id}
            handleExpandClick={() => handleExpandClick()}
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
          </CardContent>
          <CardActions disableSpacing>
            <IconButton 
              aria-label="Adicionar aos favoritos"  
              onClick={ () => dispatch(handle(props.imovel._id, token)) }
            >
              <FavoriteIcon color={isFavorito ? "disabled" : "success"}/>
            </IconButton>
            <IconButton arial-label="Compartilhe">
              <ShareIcon />
            </IconButton>
            {location ? (
              <IconButton aria-label="Localização">
                <PinDropIcon />
              </IconButton>)
              : ''
            }
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="descrição do imóvel"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <CardContent>
          
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Descricao imovel={props.imovel} />
            </Collapse>
          </CardContent>
        </Card>
        <MyDialog open={openDialog} close={() => handleWhats(true)} />
      </>
      );
}

ImovelLista.defaultPropr = {
  abaFavorito: false
}

ImovelLista.propTypes = {
  imovel:PropTypes.object,
  abaFavorito:PropTypes.bool,
  className:PropTypes.string
}