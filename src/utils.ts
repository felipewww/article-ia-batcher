import {IItem} from "./types";

export function getNumber(n: number) {
    return (n < 10) ? '0'+n : n
}

export function getTodayFolderName() {
    const today = new Date();
    
    const day = getNumber(today.getDate());
    const month = getNumber(today.getMonth()+1)
    
    return today.getFullYear() + '-' + month + '-' + day;
}

export function extractInfoFromFile(item: IItem) {
    const fnameSplited = item.name.split('/');
    const dbName = fnameSplited[1];
    const teamId = fnameSplited[4].split('=')[1]
    
    return {
        filename: item.name,
        dbName,
        teamId
    }
}