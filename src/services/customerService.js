import http from './httpService';

function getCustomers() {
    return http.get(process.env.REACT_APP_API_URL + '/customers', {headers: {
        "x-auth-token": ""
    }});
}

export { getCustomers };
