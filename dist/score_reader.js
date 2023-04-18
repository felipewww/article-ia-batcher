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
function score_reader() {
    const storage = new storage_1.Storage({
        keyFilename: 'gcp-key.json'
    });
    const bucket = storage.bucket('beeai-prd-transient-zone');
    const opts = {
        prefix: 'prod/database/beedoo/score/2022/11/',
        autoPaginate: false,
        maxResults: 10000
    };
    // bucket.file('prod/database/beedoo/score/2022/11/01/20221101-093822032.parquet')
    //     .download({
    //         destination: __dirname + '/test-dwn2/' + '20221101-093822032.parquet'
    //     })
    bucket.getFiles(opts)
        .then((res) => {
        console.log(res[2].items.length);
        let times = 1;
        res[2].items.map((item) => __awaiter(this, void 0, void 0, function* () {
            // console.log(item)
            // console.log(item.name)
            const onlyFilename = item.name.split('2022/11/')[1].split('/')[1];
            // console.log(onlyFilename)
            bucket.file(item.name).download({
                destination: __dirname + '/../test-down/' + onlyFilename
            }).catch(err => {
                console.log('download err');
                console.log(err);
            });
        }));
    })
        .catch(res => {
        console.log('error!');
        console.log(res);
    });
}
exports.score_reader = score_reader;
score_reader();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcmVfcmVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Njb3JlX3JlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1EQUF5RjtBQUd6RixTQUFnQixZQUFZO0lBQ3hCLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQztRQUN4QixXQUFXLEVBQUUsY0FBYztLQUM5QixDQUFDLENBQUM7SUFFSCxNQUFNLE1BQU0sR0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFFakUsTUFBTSxJQUFJLEdBQW9CO1FBQzFCLE1BQU0sRUFBRSxxQ0FBcUM7UUFDN0MsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7S0FDcEIsQ0FBQTtJQUVELGtGQUFrRjtJQUNsRixrQkFBa0I7SUFDbEIsZ0ZBQWdGO0lBQ2hGLFNBQVM7SUFFVCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztTQUNoQixJQUFJLENBQUMsQ0FBQyxHQUFxQixFQUFFLEVBQUU7UUFFNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2hDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQU8sSUFBVyxFQUFFLEVBQUU7WUFDbkMsb0JBQW9CO1lBQ3BCLHlCQUF5QjtZQUN6QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDakUsNEJBQTRCO1lBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDNUIsV0FBVyxFQUFFLFNBQVMsR0FBRyxnQkFBZ0IsR0FBRyxZQUFZO2FBQzNELENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNwQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQSxDQUFDLENBQUE7SUFDTixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLENBQUE7QUFDVixDQUFDO0FBekNELG9DQXlDQztBQUVELFlBQVksRUFBRSxDQUFBIn0=