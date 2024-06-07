import { ADD_CATEGORY, DELETE_CATEGORY, ERROR, GET_CATEGORIES, IS_LODING, UPDATE_CATEGORY } from "../ActionType";

export const getCategories = () => async(dispatch)=>{
    try {

        const res = await fetch("http://localhost:9000/api/v1/categories/list-categories");
        const data = await res.json();
        console.log(data.data);
        dispatch({type: GET_CATEGORIES, payload : data.data})

    } catch (error) {
        dispatch(errorCategory(error.message))
    }
}


export const addCategory = (data) => async(dispatch)=>{
    try {

       const response = await fetch("http://localhost:9000/api/v1/categories/add-category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        })
        const res = await response.json();
        console.log(res.data);
        dispatch({type: ADD_CATEGORY, payload : res.data})

    } catch (error) {
        dispatch(errorCategory(error.message))
    }
}

export const updateCategory = (data) => async(dispatch)=>{
    try {

        await fetch("http://localhost:9000/api/v1/categories/update-category/" + data._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        dispatch({type: UPDATE_CATEGORY, payload : data})

    } catch (error) {
        dispatch(errorCategory(error.message))
    }
}

export const deleteCategory = (id) => async(dispatch)=>{
    try {

        await fetch("http://localhost:9000/api/v1/categories/delete-category/" + id, {
            method: "DELETE"
        });
        dispatch({type: DELETE_CATEGORY, payload : id})

    } catch (error) {
        dispatch(errorCategory(error.message))
    }
}

export const isLodingCategory = () => async(dispatch) => {
    dispatch({ type: IS_LODING })
}
export const errorCategory = (error) => async(dispatch) =>{
    dispatch({type: ERROR , payload:error})
}
