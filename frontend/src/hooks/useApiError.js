import { useCallback } from 'react';

const useApiError = () => {

  const handleError = useCallback((error, fallbackAction) => {
    console.error('API Error:', error.message || error); // Log error for debugging 
    fallbackAction?.(); // Execute fallback action if provided

  }, []);

  const handleErrorWithAlert = useCallback((error, alert, fallbackAction) => {
    console.error('API Error:', error.message || error); 
    alert(alert || "Something went wrong")
    fallbackAction?.(); 

  }, []);

  return { handleError, handleErrorWithAlert };
};

export default useApiError;