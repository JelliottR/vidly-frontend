import React from 'react';
import Like from './common/like';

const MoviesTable = (props) => {
	const { movies, onDelete, onLiked, onSort } = props;

	return (
		<table className='table'>
			<thead>
				<tr>
					<th onClick={() => onSort('title')} scope='col'>
						Title
					</th>
					<th onClick={() => onSort('genre.name')} scope='col'>
						Genre
					</th>
					<th onClick={() => onSort('numberInStock')} scope='col'>
						Stock
					</th>
					<th onClick={() => onSort('dailyRentalRate')} scope='col'>
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
};

export default MoviesTable;
