import { createSlice } from "@reduxjs/toolkit"

const initialstate = {
    isloding: false,
    error: null,
    count: 0
}

export const counterSlice = createSlice({
    name: 'Counter',
    initialState: initialstate,
    reducers: {
        increamentCount: (state, action) => {
          state.count += 1
        },

        decreamentCount: (state, action) => {
            state.count -= 1
        }
    }

})

export const { increamentCount, decreamentCount } = counterSlice.actions
export default counterSlice.reducer