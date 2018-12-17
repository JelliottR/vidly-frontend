import React, { Component } from 'react';
import Like from './common/like';

class MoviesTable extends Component {
	raiseSort = (path) => {
		const sortColumn = this.props.sortColumn;

		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}
		this.props.onSort(sortColumn);
	};

	render() {
		const { movies, onDelete, onLiked } = this.props;

		return (
			<table className='table'>
				<thead>
					<tr>
						<th onClick={() => this.raiseSort('title')} scope='col'>
							Title
						</th>
						<th onClick={() => this.raiseSort('genre.name')} scope='col'>
							Genre
						</th>
						<th onClick={() => this.raiseSort('numberInStock')} scope='col'>
							Stock
						</th>
						<th onClick={() => this.raiseSort('dailyRentalRate')} scope='col'>
							Rate
						</th>
						<th scope='col' />
						<th scope='col' />
					</tr>
				</thead>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie._id}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like liked={movie.liked} onLiked={() => onLiked(movie)} />
							</td>
							<td>
								<button className='btn btn-sm btn-danger' onClick={() => onDelete(movie)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default MoviesTable;
