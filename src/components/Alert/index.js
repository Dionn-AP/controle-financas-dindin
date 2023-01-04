import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

function SlideTransition(props) {
    return <Slide {...props}
        direction="up"
    />;
}

const styles = {
    fontSize: '1.6rem',
    color: '#FFF',
    backgroundColor: '#2E7D32'
}

export default function AlertMessage({ message, open, setOpen }) {
    const handleClose = () => {
        setOpen(false)
    };

    return (
        <Snackbar
            autoHideDuration={4000}
            open={open}
            severity='success'
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            key={Slide}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <MuiAlert
                style={styles}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
}
