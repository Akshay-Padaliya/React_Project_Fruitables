import styled from "styled-components";

export const BaseButton = styled.button`
transition: 0.5s;
ursor: pointer;
font-weight: 600;
border-radius: 50rem !important;
color: #81c408 !important;
text-transform: uppercase !important;
padding: 1rem 1rem;
// margin-left: 1.5rem !important;
margin-bottom: 1.2rem !important;
border-color: #ffb524 !important;
display: inline-block;
line-height: 1.5;
text-align: center;
vertical-align: middle;
-moz-user-select: none;
user-select: none;
background-color: rgba(0,0,0,0);
border: 1px solid rgba(0,0,0,0);
font-size: 1rem;

&:hover{
    background: var(--bs-secondary) !important;
    color: var(--bs-white) !important;
}
`


