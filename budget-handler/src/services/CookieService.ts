import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import jwt_decode from 'jwt-decode';

const cookieKeys = {
    token: 'TOKEN',
    lastLogin: 'LAST_LOGIN',
}

interface decodeToken {
    email: string,
    exp: number,
    iat: number, 
    sub: string
}

export default class CookieService {

    public set token(token: string) {
        setCookie(cookieKeys.token, token);
    }
    public get token():string {
        const storedToken = getCookie(cookieKeys.token);
        if (storedToken) {
            const decoded: decodeToken = jwt_decode(storedToken);
            if ( Date.now() >= decoded.exp * 1000 ) {
                this.RemoveToken();
                return '';
            }
            return storedToken;
        }
        return '';
    }

    public RemoveToken() {
        removeCookie(cookieKeys.token);
    }

    public set lastLogin(lastLogin: string) {
        setCookie(cookieKeys.lastLogin, lastLogin)
    }
    public get lastLogin(): string {
        const storedLastLogin = getCookie(cookieKeys.lastLogin);
        if (storedLastLogin) {
            return storedLastLogin;
        }
        return '';
    }
}