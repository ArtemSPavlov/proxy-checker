import * as jsdom from 'jsdom';

import { ParserStrategyClass } from './parserStrategy.class';
import { ProxySourceType } from '../types/proxySource.type';
import { ProxyType } from '../../proxy/types/proxy.type';

export class ParserHostAndPortInOneElementProvider extends ParserStrategyClass {
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
            parentElements = dom.window.document.querySelectorAll(source.parentElementSelector);

      parentElements.forEach(el=>{

        const resultProxy = {host: "", port: 80, country: ""},
              hostElement = el.querySelector(source.hostSelector),
              portElement = el.querySelector(source.portSelector);

        let host = "",
            port = "";

        if(hostElement){
          host = hostElement.textContent;
        }

        if(portElement){
          port = portElement.textContent;
        }

        if(this.ipWithPortRegExp.test(host)){
          const hostWithPort = host.split(":");

          resultProxy.host = hostWithPort[0];
          resultProxy.port = +hostWithPort[1];
        } else if(this.ipRegExp.test(host) && this.portRegExp.test(port)) {
          resultProxy.host = host;
          resultProxy.port = +port;
        }

        if(source.countrySelector){
          resultProxy.country = el.querySelector(source.countrySelector).textContent;
        }

        if(resultProxy.host && resultProxy.port){

          proxyList.push(resultProxy);
        }

      })

    if(proxyList.length){
      return proxyList;
    }

    return false;
  }
}