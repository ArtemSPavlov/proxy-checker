import { ParserStrategiesEnum } from '../../common/enums/parserStrategies.enum';

export type ProxySourceType = {
  url: string;
  parserStrategy: ParserStrategiesEnum;
  hostSelector: string;
  portSelector?: string;
  parentElementSelector?: string;
  countrySelector?: string;
}