import axiosInstance from ".";

export const getExpenses = async () => {
    return axiosInstance
        .get("/get-expenses")
        .then((res) => res)
        .catch((err) => err.response);
};

export const getExpensesForUser = async () => {

};

export const postExpense = async (expense) => {
    return axiosInstance
        .post("/add-expense", expense)
        .then((res) => res)
        .catch((err) => err.response.data.message);
};

export const updateExpense = async () => {

};

export const deleteExpense = async () => {

};