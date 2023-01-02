import fetch from 'node-fetch';
import {execSync} from 'child_process';

export default class TestCommand {
  name = 'инфо';

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
  
  getLastCommitInfo() {
    return {
      'hash': execSync('git rev-parse --short HEAD').toString().trim(),
      'last_updated': execSync('git log --graph --pretty=format:\'%cr\'').toString().trim().split('\n')[0].substr(2),
    }
  }

  async handler(ctx) {
    const packageInfo = await ctx.henta.util.load('package.json');
    const apiPing = await this.getApiPing();
    const {hash, last_updated} = this.getLastCommitInfo();
    
    ctx.answer([
      `✅ ${packageInfo.description} работает (${apiPing}мс)`,
      `-- последнее обновление: ${last_updated} (${hash})`
    ]);
  }
}
