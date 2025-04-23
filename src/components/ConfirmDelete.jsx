import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Typography } from "@mui/material"

function ConfirmDelete({open, userName, onConfirm, onClose}) {
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogContent>
                <Typography>Deseja mesmo excluir o usário?</Typography>
                <Typography><p>{userName} ?</p></Typography>
            </DialogContent>
            <DialogContent>
                <Button onClick={onClose}>Cancelar</Button>
                <Button color="error" onClick={onConfirm}>Excluir</Button>
            </DialogContent>
        </Dialog>
    )
}


export default ConfirmDelete