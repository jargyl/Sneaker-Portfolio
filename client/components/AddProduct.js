import React, { Component } from "react";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: "",
      name: "",
      size: "",
      product_url: "",
      image_url: "",
      alt: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (
      this.state.sku === "" ||
      this.state.name === "" ||
      this.state.size === "" ||
      this.state.product_url === "" ||
      this.state.image_url === "" ||
      this.state.alt === ""
    ) {
      alert("Please fill in all required fields");
    } else if (
      !this.isValidUrl(this.state.product_url) ||
      !this.isValidUrl(this.state.image_url)
    ) {
      alert("Please enter a valid URL");
    } else {
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
            this.setState({
              sku: "",
              name: "",
              size: "",
              product_url: "",
              image_url: "",
              alt: "",
            });
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="sku">SKU</label>
        <input
          id="sku"
          type="text"
          name="sku"
          placeholder="SKU"
          value={this.state.sku}
          onChange={this.handleChange}
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="size">Size</label>
        <input
          id="size"
          type="text"
          name="size"
          placeholder="Size"
          value={this.state.size}
          onChange={this.handleChange}
        />
        <label htmlFor="product_url">Product URL</label>
        <input
          id="product_url"
          type="text"
          name="product_url"
          placeholder="Product URL"
          value={this.state.product_url}
          onChange={this.handleChange}
        />
        <label htmlFor="image_url">Image URL</label>
        <input
          id="image_url"
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={this.state.image_url}
          onChange={this.handleChange}
        />
        <label htmlFor="alt">Alt</label>
        <input
          id="alt"
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
