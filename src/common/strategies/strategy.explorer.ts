import { Injectable, Type } from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { IGrantStrategy, IStrategyOptions } from 'common';

@Injectable()
export class StrategyExplorer {
  constructor(private readonly modulesContainer: ModulesContainer) {}

  explore(metadataKey: string): IStrategyOptions {
    const modules = [...this.modulesContainer.values()];
    const strategies = this.parseModulesAndStrategiesReturn<IGrantStrategy>(modules, metadataKey);

    return { strategies };
  }

  parseModulesAndStrategiesReturn<T>(modules: Module[], metadataKey: string): Type<T>[] {
    const flatInstances = modules
      .map(module => {
        const instances = [...module.providers.values()];
        return instances.map((wrapper: InstanceWrapper) => this.filterModuleInstanceWithMetadata(wrapper, metadataKey));
      })
      .reduce((acc, cur) => acc.concat(cur), []);

    const strategies = flatInstances.filter(Boolean) as Type<T>[];
    return strategies;
  }

  filterModuleInstanceWithMetadata(wrapper: InstanceWrapper, metadataKey: string): Type<any> | undefined {
    const { instance } = wrapper;

    if (!instance?.constructor) {
      return undefined;
    }

    const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
    const result = metadata ? (instance.constructor as Type<any>) : undefined;

    return result;
  }
}
