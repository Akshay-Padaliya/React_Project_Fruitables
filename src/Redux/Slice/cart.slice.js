import { createSlice } from "@reduxjs/toolkit"
import { increamentCount } from "../countslice";


const initialState = {
    cartDATA: []
}

export const  cartslice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addItem: (state, action) => {
            console.log(action);

            // if(state.cartDATA.length !== 0){
            //     state.cartDATA.map((v)=>{
            //         if(v.id === action.payload.id){
            //             // v.quantity = v.quantity + action.payload.quantity
            //             v.quantity += 1
            //         }else{
            //             state.cartDATA.push(action.payload)
            //         }
            //     })
            // }else{
            //     state.cartDATA.push(action.payload)
            // }   
            let index = state.cartDATA.findIndex((v)=>v.pid === action.payload);

            

            if(index >= 0 ){
                state.cartDATA[index].qyt++;

            }else{
                state.cartDATA.push({pid: action.payload, qyt: 1})
            }
          
        }
        incrementQyt : ()
    }
});

export const { addItem } = cartslice.actions
export default cartslice.reducer