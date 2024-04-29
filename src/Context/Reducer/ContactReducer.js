import { ADD_CONTACT, DELETE_CONTACT, GET_CONTACT, UPDATE_CONTACT } from "../ActionTypes"

export const contactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contact: state.contact.concat(action.payload)
            }
            case DELETE_CONTACT:
                return {
                    ...state,
                    contact: state.contact.filter((item) => item.id !== action.payload)
                }
            case UPDATE_CONTACT:
                return {
                    ...state,
                    contact: state.contact.map((v) => v.id === action.payload.id ? action.payload : v)
                }
            case GET_CONTACT:
                return {
                    ...state,
                    contact: action.payload
                }
        default:
            return state

    }
}