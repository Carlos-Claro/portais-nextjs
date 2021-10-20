import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"
import React from "react"


export default function MyDialog(props){
    
    const [dialog, setDialog] = React.useState({
        title: 'Falta algo para prosseguir!',
        text: '',
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
        open={props.openDialog}
        onClose={() => props.handleCloseDialog()}
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
          <Button onClick={() => props.handleCloseDialog(false)}>{dialog.negativo}</Button>
          <Button onClick={() => props.handleCloseDialog(true)} autoFocus>
            {dialog.positivo}
          </Button>
        </DialogActions>
      </Dialog>
      )
}