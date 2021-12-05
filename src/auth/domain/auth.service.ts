import { Inject, Injectable } from '@nestjs/common';
import { GrantTypeEnum, IAuthService, TAuth } from 'auth/domain';
import { IGrantStrategy, IStrategyRegistry } from 'common';
import { STRATEGY_REGISTER } from '../../constants';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(STRATEGY_REGISTER)
    private readonly strategyRegistry: IStrategyRegistry
  ) {}

  async run(grantType: GrantTypeEnum, props: TAuth): Promise<any> {
    const strategy: IGrantStrategy = this.strategyRegistry.getGrantStragety(grantType.toString());

    if (!strategy) {
      throw { grant_type: grantType.toString() };
    }

    return strategy.run(props);
  }
}
