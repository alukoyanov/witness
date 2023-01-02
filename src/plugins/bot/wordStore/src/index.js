import * as fs from 'fs';
export default class WordStorePlugin {
    save(ctx) {
        if (ctx.text) {
            let file_path = `${WordStorePlugin.DIST_FOLDER}/${ctx.peerId}.csv`;
            if (!fs.existsSync(file_path)) {
                fs.writeFile(file_path, ctx.text.replaceAll(' ', ','), function (err) {
                    if (err)
                        throw err;
                    console.log('File is created successfully.');
                });
            }
            else {
                // fs.createReadStream(`${WordStorePlugin.DIST_FOLDER}/${ctx.peerId}.csv`)
                //     .on("data", function (row) {
                //         console.log(row.toString().split(','));
                //     })
                fs.appendFile(file_path, ',' + ctx.text.replaceAll(' ', ','), function (err) {
                    if (err)
                        throw err;
                    console.log('File is created successfully.');
                });
            }
        }
    }
}
WordStorePlugin.DIST_FOLDER = './dist';
