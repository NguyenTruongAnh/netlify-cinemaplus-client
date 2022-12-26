import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import './alertDialog.css'

export default function AlertDialog({ title = "", message = "", openDialog = false, handleDelete, handleCloseDialog, isFetching = false }) {
    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        disabled={isFetching}
                    >
                        Disagree
                    </Button>
                    <Button
                        onClick={handleDelete}
                        disabled={isFetching}
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}