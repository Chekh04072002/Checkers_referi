import { useState } from "react"
import { API_URL } from "../config";

const useFetch = (path, options) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFunction = async(succesFunction) => {
        try {
            setIsLoading(true);
            
            const response = await fetch(`${API_URL}${path}`, options);
            const data = await response.json();
    
            if(response.ok) succesFunction(data);
            else throw data;
            
        }catch(error) {
            setError(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    return {fetchFunction, error, isLoading}
}

export default useFetch;