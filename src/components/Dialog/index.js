import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"



export default MyDialog(props){
    const [openDialog, setOpenDialog] = React.useState(false)
    const [dialog, setDialog] = React.useState({
        title: 'Falta algo para prosseguir!',
        text: 'Para continuar esta ação, seria mais legal estar logado e assim, poderemos lhe atender melhor.',
        positivo: 'Fazer login',
        negativo: 'Continuar assim mesmo'
    })
    const handleCloseDialog = (x) => {
        if (x === undefined){
        setOpenDialog(false)
        }
        if (x){
        
        }else{}
    }
    return (
        <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialog.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog(false)}>{dialog.negativo}</Button>
          <Button onClick={handleCloseDialog(true)} autoFocus>
            {dialog.positivo}
          </Button>
        </DialogActions>
      </Dialog>
      )
}