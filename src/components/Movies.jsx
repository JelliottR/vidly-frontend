import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
	state = { movies: [], genres: [], pageSize: 4, currentPage: 1 };

	componentDidMount() {
		const genres = [ { name: 'All Genres' }, ...getGenres() ];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLiked = (movie) => {
		const movies = this.state.movies;
		const movieIndex = movies.indexOf(movie);
		movies[movieIndex].liked = !movies[movieIndex].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, movies: allMovies, selectedGenre } = this.state;
		if (count === 0) return 'There are no movies in the database.';

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
				: allMovies;

		const movies = paginate(filteredMovies, currentPage, pageSize);

		return (
			<div className='row'>
				<div className='col-3'>
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className='col'>
					<p>Showing {filteredMovies.length} movies in the database.</p>
					<MoviesTable movies={movies} onDelete={this.handleDelete} onLiked={this.handleLiked} />
					<Pagination
						itemsCount={filteredMovies.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
