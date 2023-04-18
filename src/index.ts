import {getTodayFolderName} from "./utils";
import {readFiles} from "./gcp-utils";

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.csvDispatcher = (event: any, context: any) => {
    const todayFolderName = getTodayFolderName()
    
    for (let db of ['beedoo','fis','jv','mapfre','ambev']) {
        const path = 'v2/'+db+'/user_articles/'+todayFolderName;
        readFiles(path)
    }
};
