import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api";

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

    const [expenses, setExpenses] = useState([]);


    return (
        <GlobalContext.Provider value={{
            expenses
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useExpenseContext = () => {
    return useContext(GlobalContext);
}