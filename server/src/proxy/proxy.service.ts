import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as promiseAny from 'promise.any'
import { from } from 'rxjs';

import { AddProxyDto } from '../common/dto/addProxy.dto';
import { Proxy } from './proxy.entity';
import { ProxyType } from './types/proxy.type';

@Injectable()
export class ProxyService {
    constructor(
        @InjectRepository(Proxy)
        private proxyRepository: Repository<Proxy>,
        private httpService: HttpService,
    ){}

    /**
     * Save proxies in database
     * @param dto AddProxyDto[]
     * @returns Promise<void | string>
     */
    async addProxy(dto: AddProxyDto[]): Promise<string>{
        try {
            await this.proxyRepository.save(dto);
            return "Saved in database";
        } catch (error) {
            return error;
        }
    }

  /**
   * Check proxy on private and activity
   * @param proxy ProxyType
   * @private
   * @returns Promise<ProxyType>
   */
    private checkProxy(proxy: ProxyType): Promise<ProxyType> {
        return new Promise<ProxyType>((resolve, reject)=>{
            try {
                const response = this.httpService.get(
                  process.env.PROXY_CHECK_URL,
                  {
                      proxy: proxy,
                  }
                ).toPromise();
                response.then(
                  res=>{
                    if(res.data == proxy.host){
                      resolve(proxy);
                    }
                  }
                )
            } catch (error) {
                reject(error);
            }

        })
    }

  /**
   * Get first checked proxy
   * @param proxies ProxyType[]
   * @returns Promise<ProxyType>
   */
  async getActiveProxy(proxies: ProxyType[]): Promise<ProxyType>{
        const checkedProxies = proxies.map(el=>this.checkProxy(el));

        return promiseAny(checkedProxies);
    }

  /**
   * Get array proxies from database
   * @param limit number
   * @returns Promise<ProxyType[]>
   */
  async getProxies(limit = 100): Promise<ProxyType[]> {
      return this.proxyRepository.find({
        take: limit
      });
  }

  /**
   * Get array of last checked proxies from database
   * @param limit number
   * @returns Promise<ProxyType[]>
   */
  async getActiveProxies(limit = 100): Promise<ProxyType[]> {
    return this.proxyRepository.find({
      where: {
        isActive: true,
      },
      order: {
        updateTime: "ASC",
      },
      take: limit
    });
  }

  /**
   * Update proxy activity status
   * @param proxy ProxyType
   * @returns Promise<void>
   */
  async updateProxyStatus(proxy: ProxyType): Promise<void>{
    try {
      this.httpService.get(
        process.env.PROXY_CHECK_URL,
        {
          proxy: proxy,
        }
      ).subscribe(
        value => {

        proxy.isActive = false;
        proxy.private = false;

        if(200 <= value.status && value.status < 400){
          proxy.isActive = true;
        }

        if(value.data == proxy.host){
          proxy.private = true;
        }

        this.proxyRepository.update({host: proxy.host, port: proxy.port}, proxy);
      },
        error => {
          this.proxyRepository.update(proxy, {isActive: false})
        }),
        ()=>console.log("Update complete!!");
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Update activity of proxy array
   * @param proxies
   * @returns Promise<void>
   */
  async updateProxies(proxies: ProxyType[]): Promise<void>{
    from(proxies).subscribe(
      value => {
        this.updateProxyStatus({ host: value.host, port: value.port });
      },
      error => console.log(error),
    )

  }
}
