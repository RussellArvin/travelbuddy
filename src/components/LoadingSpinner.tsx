import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import { HashLoader } from 'react-spinners';
import Modal from '@mui/material/Modal';
import { margin } from '@mui/system';

interface LoadingSpinnerProps {
    isLoading: boolean;
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 100,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: "5vw",
    justifyContent: "center",
    borderRadius: "10px",

};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
    return (
        <Fragment>
            <Modal 
            // sx={{borderRadius: "30px"}}
                open={isLoading}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <HashLoader style={{margin: "auto"}} color="#36d7b7" />
                </Box>
            </Modal>
        </Fragment>
    );
}

export default LoadingSpinner;