"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@google-cloud/storage");
const pubsub_1 = require("@google-cloud/pubsub");
const utils_1 = require("./utils");
const pubSubClient = new pubsub_1.PubSub();
/*
* O tópico gera uma nova conexão, deve ser instaciado antes para evitar um overflow de conexões
* https://stackoverflow.com/questions/65105447/google-cloud-function-dont-publish-on-pubsub-timeout-exceeded
*/
const topic = pubSubClient.topic('sponsored-partial-topic', {
    batching: {
        maxMessages: 20,
        maxMilliseconds: 3000
    }
});
function readFiles(path, teamId) {
    const opts = {
        prefix: null,
        autoPaginate: false,
    };
    opts.prefix = path;
    const storage = new storage_1.Storage();
    const bucket = storage.bucket('beeai-sponsored-article');
    bucket.getFiles(opts)
        .then((res) => {
        if (res[0].length) {
            res[2].items.map((item) => __awaiter(this, void 0, void 0, function* () {
                if (item.name.match('.csv')) {
                    yield publishMessage(item);
                }
                else {
                    console.log('[NO CSV - IGNORED] not match for item ' + item.name);
                }
            }));
        }
        else {
            console.log('[FILES NOT FOUND] ' + path);
        }
    })
        .catch(res => {
        console.log('[ERROR]');
        console.log(res);
    });
}
exports.readFiles = readFiles;
function publishMessage(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const { filename, dbName, teamId } = utils_1.extractInfoFromFile(item);
        const dataBuffer = Buffer.from(JSON.stringify({ filename, dbName, teamId }));
        try {
            const messageId = yield topic.publishMessage({ data: dataBuffer });
            // console.log(`Message ${messageId} published.`);
            console.log(`[OK] dbname: ${dbName} | teamId: ${teamId} | filename: ${filename}`);
        }
        catch (error) {
            console.log(error);
            console.error(`Received error while publishing: ${error.message}`);
        }
    });
}
exports.publishMessage = publishMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2NwLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2djcC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1EQUF5RjtBQUV6RixpREFBNEM7QUFDNUMsbUNBQTRDO0FBQzVDLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7QUFFbEM7OztFQUdFO0FBRUYsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FDaEMseUJBQXlCLEVBQUU7SUFDdkIsUUFBUSxFQUFFO1FBQ04sV0FBVyxFQUFFLEVBQUU7UUFDZixlQUFlLEVBQUUsSUFBSTtLQUN4QjtDQUNKLENBQUMsQ0FBQTtBQUVGLFNBQWdCLFNBQVMsQ0FBQyxJQUFZLEVBQUUsTUFBZTtJQUVuRCxNQUFNLElBQUksR0FBb0I7UUFDMUIsTUFBTSxFQUFFLElBQUk7UUFDWixZQUFZLEVBQUUsS0FBSztLQUN0QixDQUFBO0lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7SUFFbEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7SUFDOUIsTUFBTSxNQUFNLEdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0lBRWhFLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQXFCLEVBQUUsRUFBRTtRQUM1QixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDZixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFPLElBQVcsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUN6QixNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtpQkFDN0I7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7aUJBQ2xFO1lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQTtTQUNMO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3pDO0lBQ0wsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxDQUFBO0FBQ1YsQ0FBQztBQTlCRCw4QkE4QkM7QUFFRCxTQUFzQixjQUFjLENBQUMsSUFBVzs7UUFFNUMsTUFBTSxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLEdBQUcsMkJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFNUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUN6QyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQy9CLENBQUMsQ0FBQztRQUVILElBQUk7WUFDQSxNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztZQUNqRSxrREFBa0Q7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsTUFBTSxjQUFjLE1BQU0sZ0JBQWdCLFFBQVEsRUFBRSxDQUFDLENBQUE7U0FDcEY7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDdEU7SUFDTCxDQUFDO0NBQUE7QUFoQkQsd0NBZ0JDIn0=