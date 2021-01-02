import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';

import { ProxyService } from './proxy/proxy.service';

@Injectable()
export class AppService {
  constructor(private proxyService: ProxyService) {}

  /**
   * Set periodical proxy database update
   * @param timeOut
   * @returns Promise<void>
   */
  async upgradeProxyBase(timeOut = "*/30 * * * *"){
    const proxies = await this.proxyService.getProxies();
    const baseUpdate = cron.schedule(timeOut, ()=>{
      const currentTime = (new Date()).toString();

      this.proxyService.updateProxies(proxies);
      console.log(`${currentTime}: Proxy database updated`);
    });

    await this.proxyService.updateProxies(proxies);
    console.log("Start update");

    baseUpdate.start();
  }
}
