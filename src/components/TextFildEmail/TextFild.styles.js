import styled from "@emotion/styled";
import TextField from '@mui/material/TextField';

export const CustomTextField = styled(TextField)`
    margin-bottom: 2rem;
    
    legend {
        font-size:0.8rem;
        max-width: auto !important;
    }

    fieldset:hover {
        color: #1976d2;
    }

    legend span {
        font-size: 1.4rem !important;
        padding-right: 0;
        width: auto !important;
    }
    
    input {
        font-family: 'Rubik', sans-serif !important;
        font-size: 1.8rem !important;
    }

    label {
        color: rgba(0, 0, 0, 0.4);
        font-size: 1.6rem !important;
    }

`