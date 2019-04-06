import React, { Component } from "react";
import { getCustomers } from '../services/customerService';
import ListGroup from './common/listGroup';
import { Link } from 'react-router-dom';
import Pagination from './common/pagination';
import CustomersTable from './customersTable';
import SearchBox from './searchBox';

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' }
  };

  async componentDidMount() {
    const { data: customerData } = await getCustomers();
    const customers = [...customerData];
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.customers;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className='row'>
        {/* <div className='col-3'>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div> */}
        <div className='col'>
          {/* {user && (
            <Link to='/movies/new' className='btn btn-primary' style={{ marginBottom: 20 }}>
              New Movie
						</Link>
          )} */}
          <p>Showing {totalCount} customers in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CustomersTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}



export default Customers;
