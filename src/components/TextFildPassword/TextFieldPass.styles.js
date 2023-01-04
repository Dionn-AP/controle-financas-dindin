import styled from "@emotion/styled";
import FormControl from '@mui/material/FormControl';

export const CustomInputLabel = styled(FormControl)`
    svg {
        opacity: 0.8;
        height: 2.3rem !important;
        width: auto;
    }

    legend {
        font-size: 1.27rem;
        max-width: auto !important;
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