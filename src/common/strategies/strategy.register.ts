import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IGrantStrategy, IStrategyRegistry, TGrantStrategy } from 'common';

@Injectable()
export class StrategyRegistry implements IStrategyRegistry {
  private registry: { [s: string]: IGrantStrategy } = {};
  private metadataKey: string = null;

  constructor(private readonly moduleRef: ModuleRef) {}

  register(metadataKey: string, strategies: TGrantStrategy[] = []): void {
    this.metadataKey = metadataKey;
    strategies.forEach(strategy => this.registerStrategy(strategy));
  }

  getGrantStragety(grantType: string): IGrantStrategy {
    const hasGrantType = this.exists(grantType);
    if (!hasGrantType) {
      return;
    }
    return this.registry[grantType];
  }

  private exists(grantType: string): boolean {
    return grantType in this.registry;
  }

  protected registerStrategy(strategy: TGrantStrategy): void {
    const instance = this.moduleRef.get(strategy, { strict: false });
    if (!instance) {
      return;
    }

    const strategyName = this.reflectStrategyName(strategy);
    this.registry[strategyName] = instance as IGrantStrategy;
  }

  private reflectStrategyName(strategy: TGrantStrategy): string {
    return Reflect.getMetadata(this.metadataKey, strategy);
  }
}
