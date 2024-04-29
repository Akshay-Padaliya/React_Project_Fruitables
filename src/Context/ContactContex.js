import { createContext, useReducer } from "react"
import { contactReducer } from "./Reducer/ContactReducer";
import axios from "axios";
import { BASE_URL } from "../Base/BaseUrl";
import { ADD_CONTACT, DELETE_CONTACT, GET_CONTACT, UPDATE_CONTACT } from "./ActionTypes";

const initialState = {
    isloding : false,
    contact : [],
    error : null
}

export const contactContex = createContext();

export const ContactProvider = ({children}) => {

    const [state, dispatch]= useReducer(contactReducer,initialState);

    const addcontact = async(data) =>{
        try {
            const response = await axios.post(BASE_URL + 'contact',data)
            console.log(response.data);
            dispatch({ type: ADD_CONTACT, payload: response.data })
            // return response.data
        } catch (error) {
            console.log(error);
            
        }
    }
    const deletcontact = async (id) => {
        try {
            await axios.delete(BASE_URL + 'contact/'+ id);
            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (error) {
            console.log(error);
        }
    }
    const updatecontact = async (val) => {
        try {
            await axios.put(BASE_URL + 'contact/' + val.id ,val);
            dispatch({ type: UPDATE_CONTACT, payload: val })
        } catch (error) {
            console.log(error);
        }
    }

    const getcontact = async () => {
        try {
            const response = await axios.get(BASE_URL + 'contact');
            console.log(response.data);
            dispatch({ type: GET_CONTACT, payload: response.data })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <contactContex.Provider 
        value={{
            ...state,
            addcontact,
            deletcontact,
            updatecontact,
            getcontact
            }}>
            {children}
        </contactContex.Provider>
    )

}