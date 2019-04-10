import React, { Component } from "react";
import { getCustomers, saveCustomer } from "../services/customerService";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import CustomersTable from "./customersTable";
import SearchBox from "./searchBox";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: customerData } = await getCustomers();
    const customers = [...customerData];
    this.setState({ customers });
  }

  handleDelete = async customer => {
    saveCustomer(customer._id);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      customers: allCustomers
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter(c =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.customers;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no customers in the database.</p>;

    const { totalCount, data: customers } = this.getPagedData();

    return (
      <div className="row">
        {/* <div className='col-3'>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div> */}
        <div className="col">
          {/* {user && (
            <Link to='/movies/new' className='btn btn-primary' style={{ marginBottom: 20 }}>
              New Movie
						</Link>
          )} */}
          <p>Showing {totalCount} customers in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CustomersTable
            customers={customers}
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
