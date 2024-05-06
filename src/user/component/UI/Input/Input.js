
import React from 'react';
import { BaseInput } from './input.style';

function Input({...rest}) {
    return (
        <BaseInput
        {...rest}
        />
    );
}

export default Input;