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
            url: 'http://' + server_url + ':' + server_port + '/api/authenticate',
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