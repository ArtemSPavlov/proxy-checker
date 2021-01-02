import * as jsdom from 'jsdom';

import { ParserStrategyClass } from './parserStrategy.class';
import { ProxySourceType } from '../types/proxySource.type';
import { ProxyType } from 'src/proxy/types/proxy.type';

export class ParserHostAndPortInOneParentProvider extends ParserStrategyClass {
  protected async setRequest(source: ProxySourceType){
    const { JSDOM } = jsdom;

    const response = await this.httpService.get(
      source.url,
      // {
      //   proxy: proxy,
      // }
    ).toPromise();

    return new JSDOM(
      response.data,
    )
  }

  async getProxies(source: ProxySourceType): Promise<false | ProxyType[]>{
    const dom = await this.setRequest(source),
          proxyList = [],
          hostElementsList = dom.window.document.querySelectorAll(source.hostSelector);

      hostElementsList.forEach(el=>{
        const resultProxy = {host: "", port: 80},
              host = el.textContent;

        if(this.ipWithPortRegExp.test(host)){
          const hostWithPort = host.split(":");

          resultProxy.host = hostWithPort[0];
          resultProxy.port = +hostWithPort[1];

          proxyList.push(resultProxy);
        }
      })

    if(proxyList.length){
      return proxyList;
    }

    return false;
  }
}
