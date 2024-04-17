import { createSlice } from "@reduxjs/toolkit"
import { increamentCount } from "../countslice";


const initialState = {
    cartDATA: []
}

export const cartslice = createSlice({
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
            let index = state.cartDATA.findIndex((v) => v.pid === action.payload);

            if (index >= 0) {
                state.cartDATA[index].qyt++;

            } else {
                state.cartDATA.push({ pid: action.payload, qyt: 1 })
            }
        },
        increamentQyt: (state, action) => {

            let index = state.cartDATA.findIndex((v) => v.pid === action.payload.id);
                state.cartDATA[index].qyt++;
            
        },

        decreamentQyt: (state, action) => {

            let index = state.cartDATA.findIndex((v) => v.pid === action.payload.id);

            if (action.payload.qyt > 0) {
                state.cartDATA[index].qyt--;
            }
            state.count -= 1

        }

    }
});

export const { addItem, increamentQyt, decreamentQyt } = cartslice.actions
export default cartslice.reducer