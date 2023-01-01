export default class SaveMessagesPlugin {
  init(henta) {
    henta.vk.updates.on('message', this.handler.bind(this));
  }

  async handler(ctx, next) {
    console.log(ctx, next);

    return next();
  }
}
