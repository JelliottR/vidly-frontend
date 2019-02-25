import http from './httpService';

function getGenres() {
	return http.get(process.env.REACT_APP_API_URL + '/genres');
}

export { getGenres };
