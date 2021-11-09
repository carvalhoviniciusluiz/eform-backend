import { Type } from '@nestjs/common';
import { IGrantStrategy } from 'common';

export interface IStrategyOptions {
  strategies: Type<IGrantStrategy>[];
}
