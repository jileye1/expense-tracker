import axiosInstance from ".";

export const getExpenses = async () => {
    try {
        const response = await axiosInstance.get('/expenses');
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Error: ", error.response.data || error.message);
        return { 
            success: false, 
            error: error.response?.data?.message || 'Error fetching expenses' ,
            status: error.response.status
        };
    }
};


export const postExpense = async (expense) => {
    try {
        const response = await axiosInstance.post('/expenses', expense);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Error: ", error.response.data || error.message);
        return { 
            success: false, 
            error: error.response?.data?.message || 'Error creating expense' ,
            status: error.response.status
        };
    }
};

export const updateExpense = async () => {

};

export const deleteExpense = async (id) => {
    try {
        const response = await axiosInstance.delete('/expenses/' + id);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Error: ", error.response.data || error.message);
        return { 
            success: false, 
            error: error.response?.data?.message || 'Error deleting expense' ,
            status: error.response.status
        };
    }
};