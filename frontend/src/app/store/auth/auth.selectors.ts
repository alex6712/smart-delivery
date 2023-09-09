import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_REDUCER_NODE, AuthStore } from './auth.reducer';

export const AuthFeatureSelector =
  createFeatureSelector<AuthStore>(AUTH_REDUCER_NODE);

export const authIsAuthSelector = createSelector(
  AuthFeatureSelector,
  (state) => state.isAuth
);

export const authGetRefreshSelector = createSelector(
  AuthFeatureSelector,
  (state) => state.refresh_token
);
