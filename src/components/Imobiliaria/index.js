
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent, { cardContentClasses } from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { Avatar, Divider, Menu, MenuItem, Collapse, Container } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { styled } from '@material-ui/core/styles';
import React from "react";



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

export default function Imobiliaria(props){
    console.log(props.imobiliaria)
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    return (
        <Card sx={{ maxWidth: 345 }} component={props.component} key={`imobiliaria-${props.imobiliaria.id}`} >
            <CardHeader
                avatar={
                <Avatar 
                    arial-label={props.imobiliaria.nome_fantasia} 
                    src={`${props.imobiliaria.logo}`} 
                    sx={{width:48, height:48  }}
                />
                } 
                title={`${props.imobiliaria.nome_fantasia}`}
                subheader={`${props.imobiliaria.endereco}`}
            />
            <CardActions>
                <IconButton arial-label="Compartilhe">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="descrição do imobiliária"
                    style={{alignSelf:'flex-end'}}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.imobiliaria.descricao}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
    
}