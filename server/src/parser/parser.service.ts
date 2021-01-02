import { HttpService, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AddProxySourceDto } from '../common/dto/addProxySource.dto';
import { ProxySource } from './proxy-source.entity';
import { ParserStrategiesEnum } from '../common/enums/parserStrategies.enum';
import { ParseFromOneElementProvider } from './providers/parseFromOneElement.provider';
import { ParserHostAndPortInOneElementProvider } from './providers/parserHostAndPortInOneElement.provider';
import { ParserHostAndPortInOneParentProvider } from './providers/parserHostAndPortInOneParent.provider';
import { ProxyType } from '../proxy/types/proxy.type';

@Injectable()
export class ParserService {
  constructor(
    @InjectRepository(ProxySource)
    private proxySourceRepository: Repository<ProxySource>,
    private parseFromOneElement: ParseFromOneElementProvider,
    private parserHostAndPortInOneProviderElement: ParserHostAndPortInOneElementProvider,
    private parserHostAndPortInOneParentProvider: ParserHostAndPortInOneParentProvider,
  ) {}

  /**
   * Add proxy source to repository
   * @param source AddProxySourceDto[]
   * @returns Promise<string>
   */
  async addProxySource(source: AddProxySourceDto[]): Promise<string>{
    try {
      await this.proxySourceRepository.save(source);
      return "Saved in database";
    } catch (error) {
      return error;
    }
  }

  /**
   * Update proxy source in repository
   * @param source AddProxySourceDto
   * @returns Promise<string>
   */
  async updateProxySource(source: AddProxySourceDto): Promise<string>{
    try {
      await this.proxySourceRepository.update({url: source.url}, source);
      return "Updated";
    } catch (error) {
      return error;
    }
  }

  /**
   * Delete proxy source from repository
   * @param source AddProxySourceDto
   * @returns Promise<string>
   */
  async deleteProxySource(source: AddProxySourceDto): Promise<string>{
    try {
      await this.proxySourceRepository.delete({url: source.url});
      return "Deleted";
    } catch (error) {
      return error;
    }
  }

  /**
   * Get proxy source from repository
   * @param options?
   * @returns Promise<ProxySource[]>
   */
  async getProxySource(options?): Promise<ProxySource[]> {
    return this.proxySourceRepository.find(options);
  }

  /**
   * Get proxy list from web page
   * @param source ProxySource
   * @param proxy? ProxyInterface
   * @returns Promise<ProxyInterface[]
   */
  async getContent(source: ProxySource, proxy?: ProxyType): Promise<false | ProxyType[]>{
    try {
      switch (source.parserStrategy) {
        case ParserStrategiesEnum.allInOneElement:
          return this.parseFromOneElement.getProxies(source);
          break;

        case ParserStrategiesEnum.hostAndPortInOneElement:
          return this.parserHostAndPortInOneProviderElement.getProxies(source);
          break;

        case ParserStrategiesEnum.hostAndPortInOneParentElement:
          return this.parserHostAndPortInOneParentProvider.getProxies(source);
          break;

        default:
          return false;
          break;
      }

    } catch (error) {
      console.log(error);
    }

  }
}
