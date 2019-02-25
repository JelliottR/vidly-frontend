import http from './httpService';

const apiEndpoint = process.env.REACT_APP_API_URL + '/movies';

function movieUrl(id) {
	if (id) {
		return `${apiEndpoint}/${id}`;
	}
	return `${apiEndpoint}`;
}

export function getMovies() {
	return http.get(movieUrl());
}

export function getMovie(id) {
	return http.get(movieUrl(id));
}

export function deleteMovie(id) {
	return http.delete(movieUrl(id));
}

export function saveMovie(movie) {
	if (movie._id) {
		const body = {
			...movie
		};
		delete body._id;
		return http.put(movieUrl(movie._id), body);
	}

	http.post(movieUrl(), movie);
}
