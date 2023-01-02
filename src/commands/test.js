import fetch from 'node-fetch';

export default class TestCommand {
  name = 'тест';

  async getDbPing(ctx) {
    const dbPlugin = ctx.getPlugin('common/db');
    if (!dbPlugin) {
      return false;
    }

    const startTime = Date.now();
    await dbPlugin.authenticate();
    return Date.now() - startTime;
  }

  async getApiPing() {
    const startTime = Date.now();
    await fetch('https://api.vk.com');
    return Date.now() - startTime;
  }

  async handler(ctx) {
    const packageInfo = await ctx.henta.util.load('package.json');
    const dbPing = await this.getDbPing(ctx);
    const apiPing = await this.getApiPing();
    
    ctx.answer([
      `✅ ${packageInfo.description} V${packageInfo.version} (${apiPing}мс)`,
    ]);
  }
}
