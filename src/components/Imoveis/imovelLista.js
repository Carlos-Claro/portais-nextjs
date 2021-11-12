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
  
  Menu,
  MenuItem,
  Snackbar,
  Alert
 } from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BedIcon from '@material-ui/icons/Bed';
import BathtubIcon from '@material-ui/icons/Bathtub';
import DirectionsCarFilledIcon from '@material-ui/icons/DirectionsCarFilled';
import PinDropIcon from '@material-ui/icons/PinDrop';
import LinkIcon from '@material-ui/icons/Link';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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

import {CopyToClipboard} from 'react-copy-to-clipboard';
import MyDialogForm from "../Dialog/form";
import MyDialogAviso from "../Dialog/avisos";

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
  const link_imovel = process.env.NEXT_PUBLIC_URL + `imovel/${props.imovel.imoveis_tipos_link}-${props.imovel.tipo_negocio}-${props.imovel.cidade_link}-${props.imovel.imobiliaria_nome_seo}/${props.imovel._id}`
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
  const [openDialogForm, setOpenDialogForm] = React.useState(false)
  const handleWhats = (fechaDialog,share) => {
    if(fechaDialog){
      setOpenDialog(false)
      handleCloseShare()
    }
    const item = new ApiService(token)
    if (share){
      item.RegistraLog(props.imovel._id, 'ligacao-whatsapp').then((res) => {
        const uri = encodeURI('Veja este imóvel: ' + link_imovel)
        const uriWhats = `https://wa.me/?text=${uri}`
        window.open(uriWhats,'_blank')
      })
    }else{
      item.RegistraLog(props.imovel._id, 'compartilha-whatsapp').then((res) => {
        const uri = encodeURI('Gostaria de mais informações sobre o imóvel: ' + link_imovel)
        const uriWhats = `https://wa.me/55${props.imovel.imobiliaria_whatsapp}?text=${uri}`
        window.open(uriWhats,'_blank')
      })
    }
  }
  const clickWhats = (tipo) => {
    handleCloseOptions()
    if (session){
       handleWhats(false)
    }else{
      setOpenDialog(true)
    }
    

  }
  const clickContato = () => {
    if (session){
      handleCloseOptions()
      setOpenDialogForm(true)
    }else{
      // todo
      // cadastrar dados
    }

  }
  const handleContato = (tipo, data) => {
    if ( tipo == 'error' ){
      setSnackText(data)
      setOpenSnack(true)
    }else{
      data['id_imovel'] = props.imovel._id
      data['id_item'] = props.imovel._id
      data['id_empresa'] = props.imovel.id_empresa
      data['referencia'] = props.imovel.referencia
      data['cidade'] = props.imovel.cidade
      data['estado'] = props.imovel.uf
      data['id_cidade'] = props.imovel.id_cidade
      data['tipo_negocio_item'] = props.imovel.tipo_negocio
      data['origem'] = 'i4'
      data['assunto'] = 'Contato através do imóvel ref. ' + props.imovel.referencia + 'através da rede Portais Imobiliarios'
      const item = new ApiService(token)
      item.Contato(data).then((res) => {
        if (res.status){
          setAviso({titulo:'Pronto!!', descricao: res.message})
          setOpenDialogForm(false)
          setOpenDialogAviso(true)
          setTimeout(setOpenDialogAviso(false), 5000)

        }else{
          // retomar o botão e avisar com snack
          setSnackText(res.message)
          setOpenSnack(true)
        }
      })
      

    }
    
  }
  
  const [aviso, setAviso] = React.useState({})
  const [openDialogAviso, setOpenDialogAviso] = React.useState(false)


  const [menuShare, setMenuShare] = React.useState(null)
  const openShare = Boolean(menuShare)
  const handleOpenShare = (event) => {
    setMenuShare(event.currentTarget)
  }
  const handleCloseShare = () => {
    setMenuShare(null)
  }
  const [openSnack, setOpenSnack] = React.useState(false)
  const [snackText, setSnackText] = React.useState('Link copiado com sucesso!')
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false)
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
            clickContato={() => clickContato()}
            open={open} 
            menu={menu} 
            imobiliaria={props.imovel.imobiliaria_nome}
            id_imovel={props.imovel._id}
            link_imovel={link_imovel}
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
            <IconButton 
              arial-label="Compartilhe"
              aria-controls="share-menu"
              aria-haspopup="true"
              aria-expanded={openShare ? 'true' : undefined}
              onClick={handleOpenShare}
              id="share-menu-button"
            >
              <ShareIcon />
            </IconButton>
            {
              openShare && (
                <>
                <Menu
                id="share-menu"
                open={openShare}
                anchorEl={menuShare}
                onClose={handleCloseShare}
                MenuListProps={{'aria-labelledby':'share-menu-button'}}
                >
                  <CopyToClipboard text={link_imovel}
                    onCopy={() => {
                      setSnackText('Link copiado com sucesso!')
                      setOpenSnack(true)
                      }}>
                  <MenuItem onClick={()=>setMenuShare(false)} >
                    <IconButton>
                      <LinkIcon />
                    </IconButton>
                    Copiar Link
                    
                  </MenuItem>
                  </CopyToClipboard>
                  <MenuItem onClick={() => handleWhats(true,true)}>
                    <IconButton>
                    <WhatsAppIcon />
                    </IconButton>
                    Compartilhar Whatsapp
                  </MenuItem>
                  
                </Menu>
              </>
              )
            }
            <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
              <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                {snackText}
              </Alert>
            </Snackbar>
            {props.imovel.latitude && (
              <IconButton aria-label="Localização">
                <PinDropIcon />
              </IconButton>)
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
        {openDialog && <MyDialog open={openDialog} close={() => handleWhats(true)} />}
        {openDialogForm && <MyDialogForm 
                              open={openDialogForm} 
                              close={() => setOpenDialogForm(false)} 
                              envio={(tipo, data) => handleContato(tipo, data)} 
                              imovel={{id:props.imovel._id, imobiliaria:props.imovel.imobiliaria_nome, nome:props.imovel.nome}}
                              /> }
        {openDialogAviso && <MyDialogAviso 
                              open={openDialogAviso}  
                              close={() => setOpenDialogAviso(false)}
                              titulo={aviso.titulo}
                              descricao={aviso.descricao}
                              /> }
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