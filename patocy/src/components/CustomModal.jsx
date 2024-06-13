import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: '2px solid black',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

function CustomModal({ open, message, onClose }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
                    Oops error !
                </Typography>
                <Typography id="modal-description" sx={{ textAlign: 'center', color: 'red' }}>
                    {message}
                </Typography>

            </Box>
        </Modal>
    );
}

export default CustomModal;
