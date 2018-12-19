import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';

class MoviesTable extends Component {
	columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{ key: 'like', content: (movie) => <Like liked={movie.liked} onLiked={() => this.props.onLiked(movie)} /> },
		{
			key: 'delete',
			content: (movie) => (
				<button className='btn btn-sm btn-danger' onClick={() => this.props.onDelete(movie)}>
					Delete
				</button>
			),
		},
	];

	render() {
		const { movies, onDelete, onLiked, onSort, sortColumn } = this.props;

		return (
			<table className='table'>
				<TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
				<TableBody columns={this.columns} data={movies} />
			</table>
		);
	}
}

export default MoviesTable;
