
import { Divider, Grid, Paper, Typography } from '@material-ui/core'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import { Box } from '@material-ui/system'

export default function Logradouro(props){

    return (
        <Paper>
            <Typography>
                Endereço:
            </Typography>
            <Grid container spacing={1} sx={{p:'10px', mt:'10px'}}>
                <Grid item xs={2}>
                    <MyLocationIcon sx={{mt:'10px', ml:'10px'}} />
                </Grid>
                <Grid item xs={10}>
                    <Typography >
                        {props.endereco}, {props.numero} - {props.bairro}, {props.cidade}
                    </Typography>

                </Grid>
            </Grid>
        </Paper>
    )
}