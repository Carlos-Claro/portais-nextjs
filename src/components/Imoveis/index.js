import Images from "../Images";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent, { cardContentClasses } from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";
import { Avatar, Divider, Menu, MenuItem, Collapse } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { styled } from '@material-ui/core/styles';

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

export default function Imoveis(props){
  
    const [menu, setMenu] = React.useState(null);
    const [expanded, setExpanded] = React.useState(false);
    const open = Boolean(menu);
    const handleClickOptions = (event) => {
      event.preventDefault()
      setMenu(event.currentTarget);
    }
    const handleCloseOptions = () => {
      setMenu(null);
    }
    const handleExpandClick = () => {
      setExpanded(!expanded);
    }
   

   return (
      <>
      
        <Card sx={{ maxWidth: 345 }} component="li">
          <CardHeader
          avatar={
            <Avatar 
            arial-label={props.imovel.imobiliaria_nome} 
            src={`https://pow.com.br/powsites/${props.imovel.id_empresa}/${props.imovel.logo}`} 
            sx={{width:36, height:36  }}
            />
          } 
          action={
            <>
            <IconButton 
            id="botao-opcao"
            aria-label="mais informações" 
            aria-controls="basic-menu"
            aria-expanded={open ? 'true' : undefined}
            
            onClick={handleClickOptions}
            
            >
              <MoreVertIcon />
            </IconButton>
            <Menu 
            id="basic-menu"
            anchorEl={menu}
            open={open}
            onClose={handleCloseOptions}
            MenuListProps={{
              'aria-labelledby': 'botao-opcao',
            }}
            >
              <MenuItem onClick={handleCloseOptions} noWrap>Mais sobre este imóvel</MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseOptions}>Whatsapp</MenuItem>
              <MenuItem onClick={handleCloseOptions}>Contato</MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseOptions}>Sobre a {props.imovel.imobiliaria_nome}</MenuItem>
            </Menu>
            </>
          }
          title={`${props.imovel.nome}`}
          subheader={`${props.imovel.bairro}, ${props.imovel.cidade} - ${props.imovel.estado}`}
          />
          <Images itens={props.imovel.images} />
          
          
          <CardActions>
            <IconButton 
              aria-label="Adicionar aos favoritos"  
              onClick={ () => props.handleFavorito(props.imovel._id) }
            >
              <FavoriteIcon color={props.isFavorito ? "disabled" : "success"}/>
            </IconButton>
            <IconButton arial-label="Compartilhe">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="descrição do imóvel"
              style={{alignSelf:'flex-end'}}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            {props.imovel.descricao}
            </Typography>
          </CardContent>
          </Collapse>
        </Card>

          {/**
           * 
           <section className="lista-imovel z-depth-2 p-1">
           
           <div className="corpo-lista">
           <h1 className="indigo-text darken-3 titulo-imovel fs-16 f-bold mb-0">{props.imovel.nome}</h1>
           <small>{props.imovel.bairro}, {props.imovel.cidade} - {props.imovel.estado}</small>
           <p className="lista-descricao mb-0 justify-align">{props.imovel.descricao}</p>
           <div className="row">
           <div className="col s6">
           <p className="preco-locacao mb-0"><b>Locação</b> R$ {props.imovel.preco_locacao}</p>
           <p className="preco-venda mt-0"><b>Venda</b> R$ {props.imovel.preco_locacao}</p>
           </div>
           <div className="col s6">
           <p className="codigo-pi right"><b>Código PI</b> {props.imovel.id}</p>
           </div>
           </div>
           <div className="row mb-0">
           <div className="col s4"><i className="material-icons left">airline_seat_individual_suite</i><p className="infos">{props.imovel.quartos} quartos</p></div>
           <div className="col s4"><i className="material-icons left">wc</i><p className="infos">{props.imovel.banheiros} banheiros</p></div>
           <div className="col s4"><i className="material-icons left">directions_car</i><p className="infos">{props.imovel.garagens} vaga</p></div>
           </div>
           <div className="buttons mt-1">
           <button type="button" className="waves-effect waves-light indigo darken-3 btn-small fs-10"><i className="material-icons left">open_in_new</i>Detalhes</button>
           <button type="button" className="waves-effect waves-light red darken-4 btn-small fs-10"><i className="material-icons left">star_border</i>Favorito</button>
           <button type="button" className="waves-effect waves-light teal darken-4 btn-small fs-10"><i className="material-icons left">cloud</i>WhatsApp</button>
           </div>
           </div>
           </section>
           * 
           */}
      </>

      );
}