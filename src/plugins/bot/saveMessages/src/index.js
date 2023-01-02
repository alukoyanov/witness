export default class SaveMessagesPlugin {
  init(henta) {
    this.henta = henta;
    this.henta.vk.updates.on('message', this.handler.bind(this));
  }

  async handler(ctx, next) {
    const wordStore = this.henta.getPlugin('bot/wordStore');
    
    console.log(wordStore);

    wordStore.save(ctx.text);
    
    return next();
  }
}
