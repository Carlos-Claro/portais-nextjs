import Images from "../Images";
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";


export default function Imoveis(props){
    
    return (
      <>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader 
          action={
            <IconButton aria-label="opções">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.imovel.nome}
          subheader={`${props.imovel.bairro}, ${props.imovel.cidade} - ${props.imovel.estado}`}
          />
          <Images itens={props.imovel.images} />
          <CardContent>
            <Typography variant="body2" noWrap="5" color="text.secondary">
            {props.imovel.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="Adicionar aos favoritos">
              <FavoriteIcon />
            </IconButton>
            <IconButton arial-label="Compartilhe">
              <ShareIcon />
            </IconButton>
          </CardActions>
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