import axios from 'axios';
import CookieService from './CookieService';

export default class AuthService {
    public async Login(email: string, password: string):Promise<boolean> {
        const isLoginSuccess:boolean = await axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
                email,
                password
            }
        }).then((response) => {
            this.SetCookies(response);
            return true;
        }).catch((error) => { 
            if (error.code === 'ERR_BAD_REQUEST') {
                alert('Wrong user input');
                throw error;
            }
            else {
                throw error;
            }
        });
        return isLoginSuccess;
    }

    private SetCookies(response: any) {
        const cookieService = new CookieService();
        cookieService.token = response.data.accessToken as string;
        cookieService.lastLogin = response.data.user.email as string;
    }
}