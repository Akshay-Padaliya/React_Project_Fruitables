import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    cartDATA: [],
}

export const cartslice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            console.log(action.payload);

            let index = state.cartDATA.findIndex((v) => v.pid === action.payload.pid);

            if (index >= 0) {
                state.cartDATA[index].qyt = state.cartDATA[index].qyt + action.payload.qyt
            } else {
                state.cartDATA.push(action.payload)
                alert("Sucssesfuly Add Product to Cart");
            }
        },
        increamentQyt: (state, action) => {

     
                let index = state.cartDATA.findIndex((v) => v.pid === action.payload);
                state.cartDATA[index].qyt++;
        
        },

        decreamentQyt: (state, action) => {
            console.log(action.payload);

        
                let index = state.cartDATA.findIndex((v) => v.pid === action.payload);
                console.log(index);
                if (state.cartDATA[index].qyt > 0) {
                    state.cartDATA[index].qyt--;
                }
        },
        removeData: (state, action) => {
            state.cartDATA = state.cartDATA.filter((v) => v.pid !== action.payload)
        },
       
    }
});

export const { addItem, increamentQyt, decreamentQyt, removeData,setCount } = cartslice.actions
export default cartslice.reducer