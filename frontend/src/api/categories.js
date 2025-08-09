import axiosInstance from ".";

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get('/categories');
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Error: ", error.response.data || error.message);
        return { 
            success: false, 
            error: error.response?.data?.message || 'Error fetching categories' ,
            status: error.response.status
        };
    }
};


export const postCategory = async (category) => {
    try {
        const response = await axiosInstance.post('/categories', category);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Error: ", error.response.data || error.message);
        return { 
            success: false, 
            error: error.response?.data?.message || 'Error creating category' ,
            status: error.response.status
        };
    }
};

export const updateCategory = async () => {

};

export const deleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete('/categories/' + id);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Error: ", error.response.data || error.message);
        return { 
            success: false, 
            error: error.response?.data?.message || 'Error deleting category' ,
            status: error.response.status
        };
    }
};