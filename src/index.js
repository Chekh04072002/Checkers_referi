import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppProvider from './context/AppContext';
import { IconContext } from 'react-icons';
import NotificationProvider from './context/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <IconContext.Provider value={{color: "#3b5998", size: "18px"}}>
            <NotificationProvider>
                <App />
            </NotificationProvider>
        </IconContext.Provider>
    </AppProvider>
);
