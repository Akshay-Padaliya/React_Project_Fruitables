
// import BASE_URL from "../../Base/BaseUrl"
import axios from "axios";
import { ADD_REVIEWS } from "../ActionType";


export const addReviews = (data) => async (dispatch)=>{

    try {
        await axios
        .post("http://localhost:8000/Reviews" , data)
        .then((response)=>{
            console.log(response.data);
        dispatch({type: ADD_REVIEWS , payload: response.data})
            
        })
        .catch((error)=>{
            console.log(error);
        })
        
    } catch (error) {
        
    }

}