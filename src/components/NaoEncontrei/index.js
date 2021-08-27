import React from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@material-ui/core"
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';

export default function NaoEncontrei(){
    const [openN, setOpenN] = React.useState(true)
    const handleOpenN = () => {setOpenN(true)};
    const handleCloseN = () => {setOpenN(false)};
    return (
        <>
            <IconButton variant="outline" onClick={handleOpenN()} >
                <HelpTwoToneIcon fontSize="large" color="info" />
            </IconButton>
            <Dialog
                open={openN}
                onClose={handleCloseN()}
                onBackdropClick={handleCloseN()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    teste
                    </DialogContentText>
                </DialogContent>
                
            </Dialog>
        </>
    )
}