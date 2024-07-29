import axiosInstance from ".";

export const getExpenses = async () => {

};

export const getExpensesForUser = async () => {

};

export const postExpense = async (expense) => {
    return axiosInstance
            .post("/add-expense")
            .then((res) => res)
            .catch((err) => err.response.data.message);
};

export const updateExpense = async () => {

};

export const deleteExpense = async () => {

};