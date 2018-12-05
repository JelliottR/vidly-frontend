import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
	state = { movies: getMovies() };
	render() {
		const { length: count } = this.state.movies;

		if (count === 0) return 'There are no movies in the database.';

		return (
			<React.Fragment>
				<p>Showing {count} movies in the database.</p>

				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Title</th>
							<th scope='col'>Genre</th>
							<th scope='col'>Stock</th>
							<th scope='col'>Rate</th>
							<th scope='col' />
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<button className='btn btn-sm btn-danger' onClick={() => this.handleDelete(movie)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</React.Fragment>
		);
	}

	handleDelete(movie) {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	}
}

export default Movies;
