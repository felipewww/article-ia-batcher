import 'colors'
import dotenv from 'dotenv';
import {readFiles} from "./gcp-utils";
import {getTodayFolderName} from "./utils";
dotenv.config()

/**
 * Triggered from "npm run local"
 * Only dev environment for dispatch specific team.
 */
function localCsvDispatcher() {
    const todayFolderName = getTodayFolderName()
    const dbName = 'beedoo';
    const teamId = 1030; // AW zé delivery
    // const teamId = 899; // AW C&A
    
    readFiles(`v2/${dbName}/user_articles/${todayFolderName}/team_id_partition=${teamId}`)
}

localCsvDispatcher();