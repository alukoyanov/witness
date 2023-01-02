import * as fs from 'fs';

export class MessageGenerator
{
    public generate(peerId): string
    {
        var words = [];
        
        var data = fs.readFileSync(`./dist/${peerId}.csv`).toString().split(',')
            
        console.log(data);

        for (let i = 0; i < 10; i++) {
            if (data.length > 3 && (Math.random() * (2 - 0) + 0) === 1) {
                let rand_index = Math.floor(Math.random()*data.length) - 3;
                words.push(data[rand_index]);
                words.push(data[rand_index + 1]);
                words.push(data[rand_index + 2]);
            } else {
                words.push(data[Math.floor(Math.random()*data.length)]);
            }
        }
            
        console.log(words);
            
        return words.join(' ');
    }
}