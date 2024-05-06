import { createContext, useReducer } from "react"
import { themeReducer } from "./Reducer/ThemeReducer";
import { TOGGLE_THEME } from "./ActionTypes";

const initialState = {
    theme: 'light'
}

export const ThemeContex = createContext();

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    const themeToggle = (val) => {
         const newTheme = val === 'light' ? 'dark' : 'light';
        dispatch({type: TOGGLE_THEME, payload: newTheme});
    }
        return (
            <ThemeContex.Provider
                value={{
                    ...state,
                    themeToggle
                }}
            >
                {children}
            </ThemeContex.Provider>
        )
   

}