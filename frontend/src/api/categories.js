import axiosInstance from ".";

export const getCategories = async () => {
    return axiosInstance
        .get("/get-categories")
        .then((res) => res)
        .catch((err) => err.response);
};

export const getCategoriesForUser = async () => {

};

export const postCategory = async () => {

};

export const updateCategory = async () => {

};

export const deleteCategory = async () => {

};