import http from './httpService';

const apiEndpoint = process.env.REACT_APP_API_URL + '/customers';

function getCustomers() {
    return http.get(apiEndpoint);
}

function getCustomer(id){
    return http.get(`${apiEndpoint}/${id}`);
}

function saveCustomer(customer) {
    return http.put(`${apiEndpoint}/${customer._id}`, customer);
}


export { getCustomers, saveCustomer, getCustomer };
