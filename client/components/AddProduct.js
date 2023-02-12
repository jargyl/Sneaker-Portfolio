import React, { Component } from "react";

export default class AddProduct extends Component {
  state = {
    sku: "",
    name: "",
    size: "",
    product_url: "",
    image_url: "",
    alt: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.state),
      })
        .then((res) => res.json())
        .then((data) => {
          this.props.onAddProduct(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={this.state.sku}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={this.state.size}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="product_url"
          placeholder="Product URL"
          value={this.state.product_url}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={this.state.image_url}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="alt"
          placeholder="Alt"
          value={this.state.alt}
          onChange={this.handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    );
  }
}
