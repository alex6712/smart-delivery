import { AuthActions, authActionsType } from './auth.actions';

export const AUTH_REDUCER_NODE = 'auth';

export interface AuthStore {
  //   id: number;
  //   login: string;
  access_token: string;
  refresh_token: string;
  isAuth: boolean;
}

const initialStore: AuthStore = {
  access_token: '',
  refresh_token: '',
  isAuth: false,
};

export const authReducer = (
  state: AuthStore = initialStore,
  action: AuthActions
) => {
  switch (action.type) {
    case authActionsType.tokensSave:
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        isAuth: action.payload.isAuth,
      };
    case authActionsType.exitAccount:
      return {
        ...state,
        isAuth: action.payload.isAuth,
      };
    default:
      return state;
  }
};
