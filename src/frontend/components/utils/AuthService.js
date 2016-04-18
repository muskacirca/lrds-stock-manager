import jwt_decode from 'jwt-decode'
import axios from 'axios'

class Auth {

    logout() {
        localStorage.removeItem('user');
    }

    login(login, password) {

        return this.handleAuth(axios({
            url: 'http://localhost:3000/api/authenticate',
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                login: login, password: password
            }
        }));
    }

    getUserId() {
        return JSON.parse(localStorage.getItem('user')).id
    }

    handleAuth(loginPromise) {

        return loginPromise
            .then(function(response) {
                if(response.data.success) {
                    localStorage.setItem('user', JSON.stringify(jwt_decode(response.data.token)));
                    return true;
                }
                else { return false }
            });
    }


}

export default new Auth();