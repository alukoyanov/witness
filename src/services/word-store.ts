import * as fs from 'fs'
import { Henta } from 'henta/src';
import {MessageContext} from 'vk-io';

export default class WordStore {
    static readonly DIST_FOLDER: string = './dist';
    
    constructor(private henta: Henta) {}
    
    public save(ctx: MessageContext)
    {
        if (ctx.text) {
            let file_path = `${WordStore.DIST_FOLDER}/${ctx.peerId}.csv`;
            if (!fs.existsSync(file_path)) {
                fs.writeFile(file_path, ctx.text.replaceAll(' ', ','), function (err) {
                    if (err) throw err;
                    this.henta.log('File is created successfully.');
                });
            } else {
                // fs.createReadStream(`${WordStorePlugin.DIST_FOLDER}/${ctx.peerId}.csv`)
                //     .on("data", function (row) {
                //         console.log(row.toString().split(','));
                //     })
                fs.appendFile(file_path, ',' + ctx.text.replaceAll(' ', ','), (err) => {
                    if (err) throw err;
                    this.henta.log('saved');
                });
            }
        }
  }
}
