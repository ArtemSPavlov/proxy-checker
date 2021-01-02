import { HttpService, Injectable } from '@nestjs/common';
import * as jsdom from 'jsdom';

import { ProxySourceType } from '../types/proxySource.type';
import { ProxyType } from '../../proxy/types/proxy.type';

@Injectable()
export abstract class ParserStrategyClass {
  constructor(readonly httpService: HttpService) {
    this.ipRegExp = new RegExp("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$");
    this.portRegExp = new RegExp("^(\\d{2,5})$");
    this.ipWithPortRegExp = new RegExp("(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):(\\d{2,5})", "g");
  }

  protected readonly ipRegExp;
  protected readonly portRegExp;
  protected readonly ipWithPortRegExp;

  protected async setRequest(source: ProxySourceType){
    const response = await this.httpService.get(
      source.url
    ).toPromise();
    const { JSDOM } = jsdom;


    return response.data;
  }

  async getProxies(source: ProxySourceType): Promise<false | ProxyType[]>{
    const data = await this.setRequest(source);

      if(data){
        const proxies = data.toString().match(this.ipWithPortRegExp);
        const uniqueProxies = proxies.filter((v, i, a) => a.indexOf(v) === i)

        return uniqueProxies.map(el=>{
          const splitElements = el.split(":");

          return {host: splitElements[0], port: +splitElements[1]}
        });
      }

    return false;
  }
}