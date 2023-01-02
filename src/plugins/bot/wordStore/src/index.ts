import * as fs from 'fs'
import {parse} from 'csv'
import {MessageContext} from 'vk-io';

export default class WordStorePlugin {
    static readonly DIST_FOLDER: string = './dist';
    
    public save(ctx: MessageContext)
    {
        if (ctx.text) {
            let file_path = `${WordStorePlugin.DIST_FOLDER}/${ctx.peerId}.csv`;
            if (!fs.existsSync(file_path)) {
                fs.writeFile(file_path, ctx.text.replaceAll(' ', ','), function (err) {
                    if (err) throw err;
                    console.log('File is created successfully.');
                });
            } else {
                // fs.createReadStream(`${WordStorePlugin.DIST_FOLDER}/${ctx.peerId}.csv`)
                //     .on("data", function (row) {
                //         console.log(row.toString().split(','));
                //     })
                fs.appendFile(file_path, ',' + ctx.text.replaceAll(' ', ','), function (err) {
                    if (err) throw err;
                    console.log('File is created successfully.');
                });
            }
        }
  }
}
