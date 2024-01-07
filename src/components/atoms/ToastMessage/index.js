import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ToastMessage = (props) => {
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={props.onClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={props.onClose}
            // message={props.message}
            action={action}

        >
            {/* error success */}
            <Alert onClose={props.onClose}
                action={action}

                severity={props.status} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default ToastMessage;