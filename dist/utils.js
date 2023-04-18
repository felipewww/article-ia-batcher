"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNumber(n) {
    return (n < 10) ? '0' + n : n;
}
exports.getNumber = getNumber;
function getTodayFolderName() {
    const today = new Date();
    const day = getNumber(today.getDate());
    const month = getNumber(today.getMonth() + 1);
    return today.getFullYear() + '-' + month + '-' + day;
}
exports.getTodayFolderName = getTodayFolderName;
function extractInfoFromFile(item) {
    const fnameSplited = item.name.split('/');
    const dbName = fnameSplited[1];
    const teamId = fnameSplited[4].split('=')[1];
    return {
        filename: item.name,
        dbName,
        teamId
    };
}
exports.extractInfoFromFile = extractInfoFromFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxTQUFnQixTQUFTLENBQUMsQ0FBUztJQUMvQixPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDL0IsQ0FBQztBQUZELDhCQUVDO0FBRUQsU0FBZ0Isa0JBQWtCO0lBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFFekIsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUE7SUFFM0MsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ3pELENBQUM7QUFQRCxnREFPQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLElBQVc7SUFDM0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFNUMsT0FBTztRQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNuQixNQUFNO1FBQ04sTUFBTTtLQUNULENBQUE7QUFDTCxDQUFDO0FBVkQsa0RBVUMifQ==