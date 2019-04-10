import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCustomer, saveCustomer } from "../services/customerService";
import { toast } from "react-toastify";

class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      email: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .label("Email")
  };

  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;

      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  componentDidMount() {
    this.populateCustomer();
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      email: customer.email
    };
  }

  doSubmit = async () => {
    try {
      await saveCustomer(this.state.data);
      this.props.history.push("/customers");
      toast.success(`${this.state.data.name}'s account has been updated.`);
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        toast.error(`Sorry, you're not authorized for that.`);
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
