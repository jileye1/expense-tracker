import axiosInstance from ".";

export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.log(error.response.data);
        return { 
            success: false, 
            error: error.response?.data?.message || 'Login failed' 
        };
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const response = await axiosInstance.post('/auth/register', {
            name,
            email,
            password
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.log(error.response.data);
        return { 
            success: false, 
            error: error.response?.data?.message || 'Registration failed' 
        };
    }
};