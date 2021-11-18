import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from "@material-ui/core"
import { NoEncryption } from "@material-ui/icons"
import MarkChatReadIcon from '@material-ui/icons/MarkChatRead';
import { Box } from "@material-ui/system"
import React from "react"


export default function MyDialogAviso(props){
    
    return (
        <Dialog
        open={props.open}
        onClose={() => props.close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.titulo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <MarkChatReadIcon />
              <br />
              {props.descricao}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => props.close()} >Ok</Button>
        </DialogActions>
      </Dialog>
      )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
  };
