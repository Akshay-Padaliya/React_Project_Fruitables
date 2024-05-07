import styled from "styled-components";

const BaseButton = styled.button`
transition: 0.5s;
ursor: pointer;
font-weight: 600;
border-radius: 50rem !important;

text-transform: uppercase !important;
padding: 1rem 1rem;
margin-left: 1.5rem !important;
margin-bottom: 1.2rem !important;
display: inline-block;
line-height: 1.5;
text-align: center;
vertical-align: middle;
-moz-user-select: none;
user-select: none;
font-size: 1rem;
`

export const PrimaryButton = styled(BaseButton)`
background-color: ${props => props.disabled ? 'gray' : 'rgba(0,0,0,0)'} ;
border: 1px solid rgba(0,0,0,0);
border-color: #ffb524 !important;
color: #81c408 !important;

&:hover{
    background:  ${props => props.disabled ? 'gray' : 'var(--bs-secondary)'}  !important;
    color: var(--bs-white) !important;
}
`
export const SecondaryButton = styled(BaseButton)`
color : white;
background-color: ${props => props.disabled ? 'gray' : '#81c408'} ;
border: 2px solid #ffb524 !important;
height: 100% !important;

&:hover{
    background:  ${props => props.disabled ? 'gray' : 'var(--bs-secondary)'} !important;
    color: var(--bs-white) !important;
}
`


