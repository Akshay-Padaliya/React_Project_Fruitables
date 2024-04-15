import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartDATA: []
}

export const  cartslice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addItem: (state, action) => {
            console.log(action);

            if(state.cartDATA.length !== 0){
                state.cartDATA.map((v)=>{
                    if(v.id === action.payload.id){
                        // v.quantity = v.quantity + action.payload.quantity
                        v.quantity += 1
                    }else{
                        state.cartDATA.push(action.payload)
                    }
                })
            }else{
                state.cartDATA.push(action.payload)
            }    
          
        }
    }
});

export const { addItem } = cartslice.actions
export default cartslice.reducer