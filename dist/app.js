"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const dotenv_1 = __importDefault(require("dotenv"));
const gcp_utils_1 = require("./gcp-utils");
const utils_1 = require("./utils");
dotenv_1.default.config();
/**
 * Triggered from "npm run local"
 * Only dev environment for dispatch especific team.
 */
function localCsvDispatcher() {
    const todayFolderName = utils_1.getTodayFolderName();
    const dbName = 'beedoo';
    const teamId = 1030; // AW zé delivery
    // const teamId = 899; // AW C&A
    gcp_utils_1.readFiles(`v2/${dbName}/user_articles/${todayFolderName}/team_id_partition=${teamId}`);
}
localCsvDispatcher();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtCQUFlO0FBQ2Ysb0RBQTRCO0FBQzVCLDJDQUFzQztBQUN0QyxtQ0FBMkM7QUFDM0MsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUVmOzs7R0FHRztBQUNILFNBQVMsa0JBQWtCO0lBQ3ZCLE1BQU0sZUFBZSxHQUFHLDBCQUFrQixFQUFFLENBQUE7SUFDNUMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLGlCQUFpQjtJQUN0QyxnQ0FBZ0M7SUFFaEMscUJBQVMsQ0FBQyxNQUFNLE1BQU0sa0JBQWtCLGVBQWUsc0JBQXNCLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDMUYsQ0FBQztBQUVELGtCQUFrQixFQUFFLENBQUMifQ==