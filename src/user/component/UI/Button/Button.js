
import React from 'react';
import { BaseButton } from './button.style';

function Button({children, ...rest}) {
    return (
       <BaseButton {...rest}>
       {children}
       </BaseButton>
    );
}

export default Button;