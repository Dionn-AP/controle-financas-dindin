import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { CustomInputLabel } from './TextFieldPass.styles';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';

export default function InputPassword({ form, mrBottom, handleChangeInputValue, label }) {
    const [values, setValues] = useState(false);

    const handleClickShowPassword = () => {
        setValues(!values);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <CustomInputLabel
            style={{
                marginBottom: mrBottom
            }}
            variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                name={label === 'Senha' ? 'senha' : 'contrasenha'}
                type={values ? 'text' : 'password'}
                value={
                    label === 'Senha'
                    ? form.senha
                    : form.contrasenha
                }
            onChange={handleChangeInputValue}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {!values ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
            label={label}
            />
        </CustomInputLabel>
    );
}
