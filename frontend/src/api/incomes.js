import axiosInstance from ".";

export const getIncomes = async () => {
    return axiosInstance
        .get("/get-incomes")
        .then((res) => res)
        .catch((err) => err.response);
};

export const getIncomesForUser = async () => {

};

export const postIncome = async (expense) => {
    return axiosInstance
        .post("/add-income", expense)
        .then((res) => res)
        .catch((err) => err.response.data.message);
};

export const updateIncome = async () => {

};

export const deleteIncome = async (id) => {
    return axiosInstance
        .delete("/delete-income/" + id)
        .then((res) => res)
        .catch((err) => err.response.data.message);
};