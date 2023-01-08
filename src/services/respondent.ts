import { MessageContext } from "vk-io";

export default class Respondent
{
    constructor(private ctx: MessageContext) {}
    
    public isTimeToAnswer()
    {
        return (Math.random() * (10 - 1) + 1) > 9;
    }
    
    public sendMessage(text: string)
    {
        this.ctx.send(text);
    }
}