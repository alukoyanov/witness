import {Henta} from 'henta';
import Respondent from '../../../../services/respondent.js';
import { MessageContext } from "vk-io";
import { MessageGenerator } from '../../../../services/message-generator.js';

export default class onMessagePlugin {
  henta: Henta;
  
  init(henta: Henta) {
    this.henta = henta;
    this.henta.vk.updates.on('message', this.handler.bind(this));
  }

  async handler(ctx: MessageContext, next) {
    if (ctx.senderId < 0){
      return next();
    }
    const wordStore = this.henta.getPlugin('bot/wordStore');

    wordStore.save(ctx);
    
    let respondent = new Respondent(ctx);
    if (respondent.isTimeToAnswer()) {
      respondent.sendMessage((new MessageGenerator()).generate(ctx.peerId));
    }
        
    return next();
  }
}
