import axiosInstance from ".";

export const getExpenses = async () => {
    return axiosInstance
        .get("/expenses")
        .then((res) => res)
        .catch((err) => err.response);
};

export const getExpensesForUser = async () => {

};

export const postExpense = async (expense) => {
    return axiosInstance
        .post("/expenses", expense)
        .then((res) => res)
        .catch((err) => err.response.data.message);
};

export const updateExpense = async () => {

};

export const deleteExpense = async (id) => {
    return axiosInstance
        .delete("/expenses/" + id)
        .then((res) => res)
        .catch((err) => err.response.data.message);
};