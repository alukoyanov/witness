import { Henta } from "henta/src";
import { MessageContext } from "vk-io";

let latest_message_sent = 0;

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
            let has_claims = (Date.now() - latest_message_sent) > 600000
            latest_message_sent = this.ctx.createdAt * 1000;
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
        this.ctx.sendPhotos(
            [
                {value: './assets/images/catFU.webp'},
            ],
            {message: '@dolgryn'},
        );
    }
}