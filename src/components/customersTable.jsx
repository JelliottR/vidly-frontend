import moment from "moment";
import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import GlobalDef from "../utils/globalDefinitions";

class CustomersTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    {
      path: "email",
      label: "Email",
      content: customer => (
        <Link to={`/customers/${customer._id}`}>{customer.email}</Link>
      )
    },
    {
      path: "createdAt",
      label: "Join Date",
      content: customer => (
        <span>
          {moment(customer.createdAt).format(GlobalDef("timeFormat"))}
        </span>
      )
    },
    {
      path: "updatedAt",
      label: "Updated At",
      content: customer => (
        <span>
          {moment(customer.updatedAt).format(GlobalDef("timeFormat"))}
        </span>
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: customer => (
      <button
        onClick={() => this.props.onDelete(customer)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    if (auth.isCurrentUserAdmin()) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { customers, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
