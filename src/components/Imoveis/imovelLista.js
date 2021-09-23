import React, { useEffect } from "react";

import { 
  Avatar
  , Collapse
  , Card
  , CardActions
  , CardContent
  , CardHeader
  , IconButton
 } from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { styled } from '@material-ui/core/styles';

import PropTypes from 'prop-types'

import { useDispatch, useSelector } from "react-redux";
import { handle } from "../../store/Favoritos/Favoritos.actions";

import { Descricao } from "./descricao";
import OpcoesMenu from "./opcoesMenu";
import Images from "../Images";
import ApiService from "../../uteis/ApiService";

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
  const dispatch = useDispatch()
  const isFavorito = useSelector(state => state.favoritos.indexOf(props.imovel._id) === -1)
  const [menu, setMenu] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const open = Boolean(menu);
  const handleClickOptions = (event) => {
    console.log(event);
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
        <Card sx={{ maxWidth: 345 }} component="li" className={props.className} key={`imovel-${props.imovel._id}`} id={`imovel-${props.imovel._id}`} >
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
            open={open} 
            menu={menu} 
            imobiliaria={props.imovel.imobiliaria_nome}
            handleExpandClick={() => handleExpandClick()}
            />
          }
          title={`${props.imovel.nome}`}
          subheader={`${props.imovel.bairro}, ${props.imovel.cidade} - ${props.imovel.estado}`}
          wrapped="true"
          />
          <Images itens={props.imovel.images} id_imovel={props.imovel._id} abaFavorito={props.abaFavorito}/>
          <CardActions style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr"
          }}>
            <IconButton 
              aria-label="Adicionar aos favoritos"  
              onClick={ () => dispatch(handle(props.imovel._id, token)) }
            >
              <FavoriteIcon color={isFavorito ? "disabled" : "success"}/>
            </IconButton>
            <IconButton arial-label="Compartilhe">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="descrição do imóvel"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Descricao imovel={props.imovel} />
            </CardContent>
          </Collapse>
        </Card>
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