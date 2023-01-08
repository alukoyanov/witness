
export default class ErrorPlugin {
  henta: any;

  constructor(henta: any) {
    this.henta = henta;
  }

  async init(henta) {
    const botPlugin = henta.getPlugin('common/bot');
    const usersPlugin = henta.getPlugin('common/users');
    botPlugin.on('processError', async ([ctx, error]) => {
      ctx.builder()
        .lines([
          'Что-то пошло не так.'
        ])
        .bad();

      const admin = await usersPlugin.resolve(henta.config.public.sendErrorsTo);
      admin.send([
        `😶 ${ctx.user} вызвал ошибку:`,
        error
      ]);
    });
  }
}
