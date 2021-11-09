import { IGrantStrategy, TGrantStrategy } from 'common';

export interface IStrategyRegistry {
  register: (metadataKey: string, strategies: TGrantStrategy[]) => void;
  getGrantStragety: (grantType: string) => IGrantStrategy;
}
