// const {PubSub} = require('@google-cloud/pubsub');
// import * from '@google-cloud/pubsub'

import dotenv from 'dotenv';

dotenv.config()


// Creates a client; cache this for further use
import {PubSub} from "@google-cloud/pubsub";

const pubSubClient = new PubSub();

async function publishMessage() {
    // console.log(process.env)
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from("Hello Pubsub Node!");

    try {
        const messageId = await pubSubClient
            .topic('sponsored-partial-topic')
            .publishMessage({data: dataBuffer});
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        // process.exitCode = 1;
    }
}

// publishMessage();