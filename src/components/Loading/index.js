import { CircularProgress, Paper, Typography } from "@material-ui/core";

export default function Loading(props) {
    return (
        <Paper elevation={8} align="center" sx={{m:"10px"}} >
            <CircularProgress />
            <br />
            <Typography variant="caption"  align="center">
                Carregando {props.titulo}
            </Typography>
        </Paper>
    )
}