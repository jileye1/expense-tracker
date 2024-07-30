import axiosInstance from ".";

export const getCategories = async () => {
    return axiosInstance
        .get("/get-categories")
        .then((res) => res)
        .catch((err) => err.response);
};

export const getCategoriesForUser = async () => {

};

export const postCategory = async (category) => {
    return axiosInstance
        .post("/add-category", category)
        .then((res) => res)
        .catch((err) => err.response.data.message);

};

export const updateCategory = async () => {

};

export const deleteCategory = async (id) => {
    return axiosInstance
        .delete("/delete-category/" + id)
        .then((res) => res)
        .catch((err) => err.response.data.message);
};