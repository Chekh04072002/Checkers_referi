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