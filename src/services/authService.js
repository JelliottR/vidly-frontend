import http from './httpService';
import jwtDecode from 'jwt-decode';
import globalDefinitions from '../utils/globalDefinitions';

const apiEndpoint = process.env.REACT_APP_API_URL + '/auth';
const authTokenKey = globalDefinitions('authToken');

http.setJwt(getJwt());

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint, { email, password });
	localStorage.setItem(authTokenKey, jwt);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(authTokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(authTokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(authTokenKey);
		return jwtDecode(jwt);
	} catch (err) {
		// If error, then no token, this is fine, just anon user.
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(authTokenKey);
}

export function isCurrentUserAdmin() {
	return getCurrentUser() && getCurrentUser().isAdmin;
}

export default {
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
	isCurrentUserAdmin,
	getJwt
};
