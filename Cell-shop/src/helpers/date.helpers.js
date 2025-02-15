
export const convertDate = (date) => {
    const date = new Date(date);

    const day = date.getDate(); 
    const month = date.getMonth() + 1; 
    const year = date.getFullYear(); 
    const hours = date.getHours();
    const minutes = date.getMinutes(); 
    const seconds = date.getSeconds(); 

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate
}