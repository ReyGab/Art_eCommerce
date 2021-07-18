import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function BasicDialog({ basicDialogOpts}) {
    return (
        <div>
            <Dialog
                open={basicDialogOpts.openBasicDiag}
                onClose={basicDialogOpts.onCloseBasicDiag}
            >
                <DialogTitle>{basicDialogOpts.dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        {basicDialogOpts.dialogContentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        basicDialogOpts.actions.map((item, index) => <Button key={index} variant="contained" color={item.color} onClick={item.action}>
                            {item.label}
                        </Button>)
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
