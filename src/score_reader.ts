import {Bucket, GetFilesOptions, GetFilesResponse, Storage} from "@google-cloud/storage";
import {IItem} from "./types";

export function score_reader() {
    const storage = new Storage({
        keyFilename: 'gcp-key.json'
    });

    const bucket: Bucket = storage.bucket('beeai-prd-transient-zone')

    const opts: GetFilesOptions = {
        prefix: 'prod/database/beedoo/score/2022/11/',
        autoPaginate: false,
        maxResults: 10000
    }

    // bucket.file('prod/database/beedoo/score/2022/11/01/20221101-093822032.parquet')
    //     .download({
    //         destination: __dirname + '/test-dwn2/' + '20221101-093822032.parquet'
    //     })

    bucket.getFiles(opts)
        .then((res: GetFilesResponse) => {

            console.log(res[2].items.length)
            let times = 1;
            res[2].items.map(async (item: IItem) => {
                // console.log(item)
                // console.log(item.name)
                const onlyFilename = item.name.split('2022/11/')[1].split('/')[1]
                // console.log(onlyFilename)

                bucket.file(item.name).download({
                    destination: __dirname + '/../test-down/' + onlyFilename
                }).catch(err => {
                    console.log('download err')
                    console.log(err)
                })
            })
        })
        .catch(res => {
            console.log('error!')
            console.log(res)
        })
}

score_reader()