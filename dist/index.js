"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const gcp_utils_1 = require("./gcp-utils");
/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.csvDispatcher = (event, context) => {
    const todayFolderName = utils_1.getTodayFolderName();
    for (let db of ['beedoo', 'fis', 'jv', 'mapfre', 'ambev']) {
        const path = 'v2/' + db + '/user_articles/' + todayFolderName;
        gcp_utils_1.readFiles(path);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBMkM7QUFDM0MsMkNBQXNDO0FBRXRDOzs7OztHQUtHO0FBQ0gsT0FBTyxDQUFDLGFBQWEsR0FBRyxDQUFDLEtBQVUsRUFBRSxPQUFZLEVBQUUsRUFBRTtJQUNqRCxNQUFNLGVBQWUsR0FBRywwQkFBa0IsRUFBRSxDQUFBO0lBRTVDLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsT0FBTyxDQUFDLEVBQUU7UUFDbkQsTUFBTSxJQUFJLEdBQUcsS0FBSyxHQUFDLEVBQUUsR0FBQyxpQkFBaUIsR0FBQyxlQUFlLENBQUM7UUFDeEQscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUNsQjtBQUNMLENBQUMsQ0FBQyJ9