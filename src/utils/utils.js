import { API_URL } from "../config";


export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = dateAddZero(date.getDate());
    const month = dateAddZero(date.getMonth());
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

export function dateAddZero(number) {
    if(number < 10) return `0${number}`;
    return number;
}

export async function  fetchHandler(path, succesFunction, loadingFunction, errorFunction, options) {
    try {
        loadingFunction();
        
        const response = await fetch(`${API_URL}${path}`, options);
        const data = await response.json();

        if(response.ok) succesFunction(data);
        else throw data;
        
    }catch(error) {
        errorFunction(error);
    }
}