import React, { useState } from "react"
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField } from "@material-ui/core"
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';



export default function MyDialogForm(props){
    const [open, setOpen] = useState(props.open)
    const [disabledButton, setDisabledButton] = useState(false)
    const [btnSubmit, setBtnSubmit] = useState('Enviar')
    const [message, setMessage] = useState('')
    const handleMessage = (e) => {
      setMessage(e.target.value)
    }
    const [aceite, setAceite] = useState(false)
    const handleAceite = (e) => {
      setAceite(e.target.checked)
    }
    const handleEnvio = () => {
      
        setBtnSubmit(<CircularProgress />)
        if ( message != '' ){
          if ( aceite ) {
            const d = {}
            d['message'] = message
            props.envio('success', d)
          }else{
            props.envio('error', 'Leia e aceite nossos termos de uso da aplicação para prosseguir')
            setBtnSubmit('Enviar')
          }
        }else{
          props.envio('error', 'A mensagem é obrigatória, preencha por favor')
          setBtnSubmit('Enviar')
        }
    }
    const handleClose = () => {
      props.close()
    }
    return (
        <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
          Faça contato com a {props.imovel.imobiliaria} sobre imovel {props.imovel.nome}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormGroup>
              <TextField
                    id="mensagem-form"
                    label="Mensagem"
                    fullWidth
                    multiline
                    rows={5}
                    value={message}
                    onChange={handleMessage}
                    
                />
              <FormControlLabel 
                control={<Checkbox />} 
                label="Aceite os termos e condições de uso da aplicação" 
                onChange={handleAceite} 
                />

            </FormGroup>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} endIcon={<CancelIcon />} >Cancelar</Button>
          <Button onClick={() =>handleEnvio()} endIcon={<SendIcon />} >
            {btnSubmit}
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
