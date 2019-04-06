import http from './httpService';
import globalDef from '../utils/globalDefinitions'

function getCustomers() {
    return http.get(process.env.REACT_APP_API_URL + '/customers', {headers: {
        "x-auth-token": localStorage.getItem( globalDef('authToken') )
    }});
}

export { getCustomers };
