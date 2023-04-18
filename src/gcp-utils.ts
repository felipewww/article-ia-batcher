import {Bucket, GetFilesOptions, GetFilesResponse, Storage} from "@google-cloud/storage";
import {IItem} from "./types";
import {PubSub} from "@google-cloud/pubsub";
import {extractInfoFromFile} from "./utils";
const pubSubClient = new PubSub();

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

export function readFiles(path: string, teamId?: number) {
    
    const opts: GetFilesOptions = {
        prefix: null,
        autoPaginate: false,
    }
    
    opts.prefix = path
    
    const storage = new Storage();
    const bucket: Bucket = storage.bucket('beeai-sponsored-article')
    
    bucket.getFiles(opts)
        .then((res: GetFilesResponse) => {
            if (res[0].length) {
                res[2].items.map(async (item: IItem) => {
                    if (item.name.match('.csv')) {
                        await publishMessage(item)
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

export async function publishMessage(item: IItem) {
    
    const {filename, dbName, teamId} = extractInfoFromFile(item)
    
    const dataBuffer = Buffer.from(JSON.stringify(
        { filename, dbName, teamId }
    ));
    
    try {
        const messageId = await topic.publishMessage({data: dataBuffer});
        // console.log(`Message ${messageId} published.`);
        console.log(`[OK] dbname: ${dbName} | teamId: ${teamId} | filename: ${filename}`)
    } catch (error) {
        console.log(error)
        console.error(`Received error while publishing: ${error.message}`);
    }
}
