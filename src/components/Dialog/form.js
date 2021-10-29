import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core"

import React, { useState } from "react"
import ImovelLista from "../Imoveis/imovelLista";


export default function MyDialogForm(props){
    const [disabledButton, setDisabledButton] = useState(false)
    const [message, setMessage] = useState('')
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const handleEnvio = () => {
        if ( message != '' ){
            props.envio(message)
        }
    }
    return (
        <Dialog
        open={props.open}
        onClose={() => props.close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
          Faça contato com {props.imovel.imobiliaria} sobre imovel {props.imovel.nome}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
                id="mensagem-form"
                label="Mensagem"
                fullWidth
                multiline
                maxRows={8}
                value={message}
                onChange={handleChange}
            />

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.close()}>Cancelar</Button>
          <Button onClick={() =>handleEnvio()}  >
            Enviar
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
