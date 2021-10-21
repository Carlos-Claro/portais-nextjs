import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from "@material-ui/core"
import { NoEncryption } from "@material-ui/icons"
import { Box } from "@material-ui/system"
import React from "react"


export default function MyDialog(props){
    
    const [dialog, setDialog] = React.useState({
        title: 'Falta algo para prosseguir!',
        text: 'Para nos ajudar a sugerir melhores imóveis e resultados, considere fazer logIn antes de prosseguir',
        positivo: 'Fazer login',
        negativo: 'Continuar assim mesmo'
    })
    
    return (
        <Dialog
        open={props.open}
        onClose={() => props.close()}
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
          <Button onClick={() => props.close()}>{dialog.negativo}</Button>
          <Button onClick={() => window.open('/auth/signin', '_blank')} autoFocus>
            {dialog.positivo}
          </Button>
        </DialogActions>
      </Dialog>
      )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
  };

export function MyModalSignIn(props){

    return (
        <Modal
        open={props.open}
        close={() => props.close()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
        >
            <Box sx={style} >
                
            </Box>
        </Modal>

    )
}