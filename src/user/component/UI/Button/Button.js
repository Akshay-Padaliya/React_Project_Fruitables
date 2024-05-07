
import React from 'react';
import { PrimaryButton, SecondaryButton } from './button.style';

function Button({children, btnType='primary', btnDisble=false , ...rest}) {
    // console.log(btnType);
    console.log({...rest});

    const chackType = ()=>{
        switch(btnType){
            case 'primary':
                return PrimaryButton
            case 'secondary':
                return SecondaryButton
            default:
                return PrimaryButton
        }
    }

    const CustomeType = chackType();

    return (
       <CustomeType disabled={btnDisble} {...rest}>
       {children}
       </CustomeType>
    );
}

export default Button;