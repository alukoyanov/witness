import { Henta } from "henta/src";
import { Attachment, MessageContext, PhotoAttachment } from "vk-io";

let latest_message_sent_1 = 0;
let latest_message_sent_2 = 0;

const TIME_NEED = 60000 * 60 * 2 // 2 часа

export default class Respondent
{
    constructor(
        private henta: Henta,
        private ctx: MessageContext
    ) {}
    
    public isTimeToAnswer()
    {
        return (Math.random() * (10 - 1) + 1) > 9;
    }
    
    public isHasClaimsToUser()
    {
        if (this.ctx.senderId === 310132333) {
            let has_claims = (Date.now() - latest_message_sent_1) > TIME_NEED
            latest_message_sent_1 = this.ctx.createdAt * 1000;
            return has_claims;
        }
        if (this.ctx.senderId === 549514959) {
            let has_claims = (Date.now() - latest_message_sent_2) > TIME_NEED
            latest_message_sent_2 = this.ctx.createdAt * 1000;
            return has_claims;
        }
        return false;
    }
    
    public sendMessage(text: string)
    {
        this.ctx.send(text);
    }
    
    public async sendClaims()
    {
        if (this.ctx.senderId === 310132333) {
            return this.ctx.reply({
                attachment: await this.henta.vk.upload.messagePhoto({
                    source: {
                        value: './assets/images/catFU.webp'
                    }
                }),
            });
        }
        if (this.ctx.senderId === 549514959) {
            return this.ctx.reply({
                attachment: await this.henta.vk.upload.messagePhoto({
                    source: {
                        value: './assets/images/catRose.webp'
                    }
                }),
            });
        }
    }
}