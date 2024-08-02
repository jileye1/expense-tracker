import axiosInstance from ".";

export const getCategories = async () => {
    return axiosInstance
        .get("/categories")
        .then((res) => res)
        .catch((err) => err.response);
};

export const getCategoriesForUser = async () => {

};

export const postCategory = async (category) => {
    return axiosInstance
        .post("/categories", category)
        .then((res) => res)
        .catch((err) => err.response.data.message);

};

export const updateCategory = async () => {

};

export const deleteCategory = async (id) => {
    return axiosInstance
        .delete("/categories/" + id)
        .then((res) => res)
        .catch((err) => err.response.data.message);
};