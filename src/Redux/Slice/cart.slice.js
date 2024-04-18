import { createSlice } from "@reduxjs/toolkit"
import { increamentCount } from "../countslice";


const initialState = {
    cartDATA: [],
    count: 0
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
                state.cartDATA.push({ pid: action.payload, qyt:  state.count })
            }
        },
        increamentQyt: (state, action) => {

            let index = state.cartDATA.findIndex((v) => v.pid === action.payload);
                state.cartDATA[index].qyt++;  
                state.count ++;
        },

        decreamentQyt: (state, action) => {
            console.log(action.payload);
            let index = state.cartDATA.findIndex((v) => v.pid === action.payload);
            console.log(index);

            if (state.cartDATA[index].qyt > 0) {
                state.cartDATA[index].qyt--;
            }
            if(state.count > 1){
                state.count --;
            }
        },
        removeData : (state, action) => {
            state.cartDATA = state.cartDATA.filter((v) => v.pid !== action.payload)
        }

    }
});

export const { addItem, increamentQyt, decreamentQyt,removeData } = cartslice.actions
export default cartslice.reducer