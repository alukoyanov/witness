import * as fs from 'fs';
import { Henta } from 'henta/src/index.js';
import * as random from '../components/random.js';

export class MessageGenerator
{
    constructor(private henta: Henta) {}
    
    public generate(peerId): string
    {
        var words = [];
        
        var data = fs.readFileSync(`./dist/${peerId}.csv`).toString().split(',')
        
        console.log(data);
        
        for (let i = 0; i < random.choise(0, 5); i++) {
            if (data.length > 3 && random.range(0, 2).equals(1)) {
                let rand_index = random.choise(0, data.length) - 3;
                words.push(data[rand_index]);
                words.push(data[rand_index + 1]);
                words.push(data[rand_index + 2]);
            } else {
                words.push(random.choise(data));
            }
        }
            
        this.henta.log(words.join(' '));
            
        return words.join(' ');
    }
}