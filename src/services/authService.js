import http from './httpService';
import jwtDecode from 'jwt-decode';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint, { email, password });
	localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (err) {
		// If error, then no token, this is fine, just anon user.
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
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
