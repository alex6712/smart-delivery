export const AUTH_REDUCER_NODE = 'auth';

export interface AuthStore {
  id: number;
  login: string;
}

export const authReducer = (state = 0, action: any) => {
  return state;
};
