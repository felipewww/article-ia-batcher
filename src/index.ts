import {Bucket, GetFilesOptions, GetFilesResponse, Storage} from '@google-cloud/storage'
import {IItem} from "./types";
import {PubSub, Topic} from "@google-cloud/pubsub";
const pubSubClient = new PubSub();

function getNumber(n: number) {
    return (n < 10) ? '0'+n : n
}

function getTodayFolderName() {
    const today = new Date();

    const day = getNumber(today.getDate());
    const month = getNumber(today.getMonth()+1)

    const todayFolderName = today.getFullYear() + '-' + month + '-' + day;

    return todayFolderName;
}

async function publishMessage(filename: string, dbName: string, teamId: string, topic: Topic) {

    const dataBuffer = Buffer.from(JSON.stringify(
        { filename, dbName, teamId }
    ));

    try {
        const messageId = await topic.publishMessage({data: dataBuffer});
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.log(error)
        console.error(`Received error while publishing: ${error.message}`);
    }
}

interface IMessage {
    dbName: string
}
/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.csvDispatcher = (event: any, context: any) => {

    // const storage = new Storage({
    //     keyFilename: 'gcp-key.json'
    // });
    
    const storage = new Storage();

    const todayFolderName = getTodayFolderName()
    const bucket: Bucket = storage.bucket('beeai-sponsored-article')
    
    const opts: GetFilesOptions = {
        prefix: null,
        autoPaginate: false,
    }

    /*
     * O tópico gera uma nova conexão, deve ser instaciado antes para evitar um overflow de conexões
     * https://stackoverflow.com/questions/65105447/google-cloud-function-dont-publish-on-pubsub-timeout-exceeded
     */
    const topic = pubSubClient.topic(
        'sponsored-partial-topic', {
            batching: {
                maxMessages: 20,
                maxMilliseconds: 3000
            }
        })
    
    const dbs = ['beedoo','fis','jv','mapfre','ambev']
    
    for (let db of dbs) {
        const path = 'v2/'+db+'/user_articles/'+todayFolderName;
        opts.prefix = path
        bucket.getFiles(opts)
            .then((res: GetFilesResponse) => {
            
                // console.log('read bucket res...')
                // console.log(res)
                
                if (res[0].length) {
                    let times = 1;
                    res[2].items.map(async (item: IItem) => {
                        if (item.name.match('.csv')) {
                        
                            const fnameSplited = item.name.split('/')
                        
                            const dbName = fnameSplited[1];
                            const teamId = fnameSplited[4].split('=')[1]
                        
                            console.log(`[OK] ${dbName} ${teamId} - publishing this filename to a message...`)
                            console.log(item.name)
                        
                            await publishMessage(item.name, dbName, teamId, topic);
                        
                            times++;
                        } else {
                            console.log('[NO CSV - IGNORED] not match for item '+item.name)
                        }
                    })
                } else {
                    console.log('[FILES NOT FOUND] '+path)
                }
            })
            .catch(res => {
                console.log('[ERROR]')
                console.log(res)
            })
    }
};
