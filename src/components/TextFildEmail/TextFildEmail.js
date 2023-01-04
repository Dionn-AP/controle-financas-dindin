import * as React from 'react';
import { CustomTextField } from './TextFild.styles'

export default function InputEmail({ form, handleChangeInputValue, type, label }) {

  return (
    <CustomTextField
      id="outlined-basic"
      type={type}
      name={label === 'Nome' ? 'nome' : 'email'}
      label={label}
      variant="outlined"
      value={label === 'Nome' ? form.nome : form.email}
      onChange={handleChangeInputValue}
    />
  );
}
