import {Bucket, GetFilesOptions, GetFilesResponse, Storage} from '@google-cloud/storage'
import {IItem} from "./types";
import {PubSub} from "@google-cloud/pubsub";
const pubSubClient = new PubSub();

function getNumber(n: number) {
    return (n < 10) ? '0'+n : n
}

function getTodayFolderName() {
    const today = new Date();

    const day = getNumber(today.getDate());
    const month = getNumber(today.getMonth()+1)

    const todayFolderName = today.getFullYear() + '_' + month + '_' + day;

    return todayFolderName;
}

async function publishMessage(filename: string) {
    // const pubSubClient = new PubSub();

    const dataBuffer = Buffer.from(JSON.stringify(
        { filename }
    ));

    try {
        const messageId = await pubSubClient
            .topic('sponsored-partial-topic', {
                batching: {
                    maxMessages: 20,
                    maxMilliseconds: 3000
                }
            })
            .publishMessage({data: dataBuffer});

        console.log(`Message ${messageId} published.`);

        // await pubSubClient.close();
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        // await pubSubClient.close();
    }
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
        prefix: 'analytics_learning/users_articles/'+todayFolderName+'/',
        autoPaginate: false,
    }

    bucket.getFiles(opts)
        .then((res: GetFilesResponse) => {

            let times = 1;
            res[2].items.map(async (item: IItem) => {
                if (item.name.match('.csv')) {
                    console.log('publishing this filename to a message...')
                    console.log(item.name)

                    await publishMessage(item.name);

                    times++;
                }
            })
        })
        .catch(res => {
            console.log('error!')
            console.log(res)
        })
};
