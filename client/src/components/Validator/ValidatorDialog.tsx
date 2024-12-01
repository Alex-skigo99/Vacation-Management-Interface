import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import { API } from '../../consts';
import { Status, validateVacationApprove } from '../../validaition';


interface ValidatorDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    id: number | null;
    effect: boolean;
    setEffect: (effect: boolean) => void;
};

const ValidatorDialog: React.FC<ValidatorDialogProps> = ({open, setOpen, id, effect, setEffect}) => {
    const [comment, setComment] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleAproved = () => {
        const udpateData = {
            status: 'approved' as Status,
            comments: comment
        };
        console.log('Approved', udpateData);
        validateVacationApprove(udpateData);
        register(udpateData);
    };

    const handleRejected = () => {
        const udpateData = {
            status: 'rejected',
            comments: comment
        };
        console.log('Rejected', udpateData);
        register(udpateData);
    };

    const register = (data: any) => {
        if (!id) {
            console.error('No vacation id provided');
            return;
        }
        axios.patch(`${API.vacations}/${id}`, data)
            .then(response => {
                console.log('Vacation updated', response.data);
                setEffect(!effect);
                handleClose();
            })
            .catch(error => {
                console.error('There was an error updating the vacation!', error);
            });
    };

    return (
        <>
            <Dialog
                open={open} 
                onClose={handleClose}
            >
                <DialogTitle>Edit Vacation</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment"
                        label="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        variant='standard'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAproved} color="primary" variant="outlined">Approved</Button>
                    <Button onClick={handleRejected} color="secondary" variant="outlined">Rejected</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ValidatorDialog;