import { createContext, useState } from "react"

const messageTime = 2000;
const defaultValue = {
    isLoading: false, 
    errorMessage: '',
    succesMessage: '',
    showLoader: () => null,
    showErrorMessage: (message) => null,
    showSuccessMessage: (message) => null,
    resetNotification: () => null
}

export const NotificationContext = createContext(defaultValue);

const NotificationProvider = ({children}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [succesMessage, setSuccesMessage] = useState('');

    const showLoader = () => {
        console.log("loading")
        resetNotification();
        setIsLoading(true);
    }

    const showSuccessMessage = (message) => {
        resetNotification();
        setSuccesMessage(message);
        setTimeout(() => setSuccesMessage(""), messageTime);
    }

    const showErrorMessage = (message) => {
        resetNotification();
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(""), messageTime);
    }

    const resetNotification = () => {
        setErrorMessage('');
        setIsLoading(false);
        setSuccesMessage('');
    }

    const value = {
        errorMessage,
        isLoading,
        succesMessage,
        showLoader,
        showErrorMessage,
        showSuccessMessage,
        resetNotification
    }

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export default NotificationProvider;