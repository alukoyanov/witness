import {Henta} from 'henta';
import Respondent from '../../../../services/respondent.js';
import { MessageContext } from "vk-io";
import { MessageGenerator } from '../../../../services/message-generator.js';
import WordStore from '../../../../services/word-store.js';

export default class onMessagePlugin {
    henta: Henta;

    init(henta: Henta) {
        this.henta = henta;
        this.henta.vk.updates.on('message', this.handler.bind(this));
    }

    async handler(ctx: MessageContext, next)
    {
        if (ctx.senderId < 0){
            return next();
        }
        
        (new WordStore(this.henta)).save(ctx);

        let respondent = new Respondent(this.henta, ctx);
        if (respondent.isHasClaimsToUser()) {
            respondent.sendClaims();
        }
        
        if (respondent.isTimeToAnswer()) {
            respondent.sendMessage((new MessageGenerator(this.henta)).generate(ctx.peerId));
        }

        return next();
    }
}
