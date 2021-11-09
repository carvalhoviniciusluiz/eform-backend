import { Inject, Injectable } from '@nestjs/common';
import { AuthException, GrantTypeEnum, IAuthService, TAuth } from 'auth/domain';
import { IGrantStrategy, IStrategyRegistry } from 'common';
import { STRATEGY_REGISTER } from 'auth/../constants';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(STRATEGY_REGISTER)
    private readonly strategyRegistry: IStrategyRegistry
  ) {}

  async run(grantType: GrantTypeEnum, props: TAuth): Promise<any> {
    const strategy: IGrantStrategy = this.strategyRegistry.getGrantStragety(grantType.toString());

    if (!strategy) {
      throw AuthException.strategyNotFound(grantType.toString());
    }

    return strategy.run(props);
  }
}
