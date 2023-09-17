import { environment } from 'src/environments/environment';

export const MAIN_URL = 'http://127.0.0.1:8080/api/' + environment.apiVersion;
export const FUNCTIONALY_CHECK_URL = MAIN_URL + '/';

export const SIGNIN_URL = MAIN_URL + '/auth/sign_in';
export const SIGNUP_URL = MAIN_URL + '/auth/sign_up';
export const REFRESH_URL = MAIN_URL + '/auth/refresh';

export const UPLOAD_STATION_FORM = MAIN_URL + '/delivery/railway';

export const ME_URL = MAIN_URL + '/users/me';
