import { API_URL } from "../config";


export function formatDate(dateString) {
    if(!dateString) return "Дата не указана";

    const date = new Date(dateString);
    const day = dateAddZero(date.getDate());
    const month = dateAddZero(date.getMonth() + 1);
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

        if(response.ok) {
            succesFunction(data);
            return data;
        }else throw data;
        
    }catch(error) {
        errorFunction(error);
    }
}

export function paginateData (array, limit, page){
    const startInd = (page - 1) * limit;
    const endInd = limit * page;
    return array.slice(startInd, endInd)
}