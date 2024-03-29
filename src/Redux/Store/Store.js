
import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { rootReducer } from '..';




export const configStore = () =>{

    const store = createStore(rootReducer, applyMiddleware(thunk));

    return  store;
}
