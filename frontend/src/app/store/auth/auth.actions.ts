import { Action } from '@ngrx/store';

export enum authActionsType {
  tokensSave = '[AUTH] save tokens',
  exitAccount = '[AUTH] exit account',
}

export class AuthTokensSaveAction implements Action {
  readonly type = authActionsType.tokensSave;
  constructor(
    public payload: {
      access_token: string;
      refresh_token: string;
      isAuth: boolean;
    }
  ) {}
}

export class AuthExitAccountAction implements Action {
  readonly type = authActionsType.exitAccount;
  constructor(
    public payload: {
      isAuth: boolean;
    }
  ) {}
}

export type AuthActions = AuthTokensSaveAction | AuthExitAccountAction;
