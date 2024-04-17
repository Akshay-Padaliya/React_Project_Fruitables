import { createSlice } from "@reduxjs/toolkit"

const initialstate = {
    isloding: false,
    error: null,
    count: 1
}




export const counterSlice = createSlice({
    name: 'Counter',
    initialState: initialstate,
    reducers: {
        increamentCount: (state, action) => {
          return  action.payload.qyt++;
        },

        decreamentCount: (state, action) => {

            if (action.payload.qyt > 0) {
                return action.payload.qyt--;
            }
            state.count -= 1

        }
    }

})

export const { increamentCount, decreamentCount } = counterSlice.actions
export default counterSlice.reducer