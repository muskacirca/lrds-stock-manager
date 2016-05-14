import jwt_decode from 'jwt-decode'
import axios from 'axios'

const server_port = process.env.PORT || 3000
const server_url = process.env.SERVER_URL || "localhost"

class Auth {

    logout() {
        localStorage.removeItem('user');
    }

    login(login, password) {

        return this.handleAuth(axios({
            url: '/api/authenticate',
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

    getLogin() {
        return JSON.parse(localStorage.getItem('user')).login
    }

    handleAuth(loginPromise) {

        return loginPromise
            .then(function(response) {
                if(response.data.success) {
                    
                    var response = JSON.stringify(jwt_decode(response.data.token));
                    localStorage.setItem('user', response);
                    return true;
                }
                else { return false }
            });
    }


}

export default new Auth();