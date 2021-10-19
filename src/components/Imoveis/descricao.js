import { Chip, Box, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import BedIcon from '@material-ui/icons/Bed';
import BathtubIcon from '@material-ui/icons/Bathtub';
import DirectionsCarFilledIcon from '@material-ui/icons/DirectionsCarFilled';
import OpenInFullIcon from '@material-ui/icons/OpenInFull';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export const Descricao = (props) => {
    
    return (
        <>
            
            <Box style={{
                display: Grid,
                gridTemplateColumns: "1fr 1fr",
                
            }}>
            {props.imovel.area_util ? <Chip style={{margin:"5px"}} variant="outlined" color="info" size="small" icon={<OpenInFullIcon />} label={`area util: ${props.imovel.area_util} m2`} /> : ''}
            {props.imovel.area_total ? <Chip style={{margin:"5px"}} variant="outlined" color="info" size="small" icon={<OpenInFullIcon />} label={`area util: ${props.imovel.area_total} m2`} /> : ''}
            {props.imovel.area_terreno ? <Chip style={{margin:"5px"}} variant="outlined" color="info" size="small" icon={<OpenInFullIcon />} label={`area terreno: ${props.imovel.area_terreno} m2`} /> : ''}
            </Box>
                <Typography>
                    Descrição:
                </Typography>
            
            <Typography variant="body2" color="text.secondary">
            {(props.imovel.descricao).replace("/r/n","<br>").replace(/(<([^>]+)>)/gi, "")}
            </Typography>
        </>
    )
}