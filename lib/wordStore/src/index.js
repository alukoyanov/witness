import * as fs from 'fs';
import { parse } from 'csv';
export default class WordStorePlugin {
    init(henta) { }
    save(ctx) {
        console.log(ctx);
        fs.createReadStream(`${WordStorePlugin.DIST_FOLDER}/${ctx.peerId}.csv`)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
            console.log(row);
        });
    }
}
WordStorePlugin.DIST_FOLDER = './dist';
