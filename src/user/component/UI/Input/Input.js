
import React from 'react';
import { BaseInput, SpanError } from './input.style';

function Input({ errorText, ...rest }) {
    return (
        <>
            <BaseInput
                {...rest}
            />
            <SpanError>
                {errorText}
            </SpanError>
        </>
    );
}

export default Input;