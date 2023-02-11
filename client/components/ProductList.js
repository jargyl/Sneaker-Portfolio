import React, { Component } from "react";
import ProductListItem from "./ProductListItem";

export default class ProductList extends Component {
  state = {
    products: [],
    selectedProduct: null,
    editMode: false,
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/product/all");
      const data = await res.json();
      this.setState({ products: data });
    } catch (error) {
      console.error(error);
    }
  };

  handleEditClick = (product) => {
    this.setState({ selectedProduct: product, editMode: true });
  };

  handleCancelClick = () => {
    this.setState({ selectedProduct: null, editMode: false });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { id, name, sku, size, product_url, image_url, alt } =
      e.target.elements;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:3000/product/${this.state.selectedProduct._id}/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            sku: sku.value,
            size: size.value,
            product_url: product_url.value,
            image_url: image_url.value,
            alt: alt.value,
          }),
        }
      );
      if (res.status === 200) {
        this.fetchProducts(); // Refetch the products from the server
        this.setState({ selectedProduct: null });
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        this.fetchProducts(); // Refetch the products from the server
        this.setState({ selectedProduct: null });
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { products, selectedProduct, editMode } = this.state;
    return (
      <div>
        {selectedProduct && editMode ? (
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                defaultValue={selectedProduct.name}
              />
            </div>
            <div>
              <label htmlFor="sku">SKU:</label>
              <input type="text" id="sku" defaultValue={selectedProduct.sku} />
            </div>
            <div>
              <label htmlFor="size">Size:</label>
              <input
                type="text"
                id="size"
                defaultValue={selectedProduct.size}
              />
            </div>
            <div>
              <label htmlFor="product_url">Product URL:</label>
              <input
                type="text"
                id="product_url"
                defaultValue={selectedProduct.product_url}
              />
            </div>
            <div>
              <label htmlFor="image_url">Image URL:</label>
              <input
                type="text"
                id="image_url"
                defaultValue={selectedProduct.image_url}
              />
            </div>
            <div>
              <label htmlFor="alt">Alt:</label>
              <input type="text" id="alt" defaultValue={selectedProduct.alt} />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={this.handleCancelClick}>
              Cancel
            </button>
          </form>
        ) : (
          <ul>
            {products.map((product) => (
              <ProductListItem
                key={product.id}
                product={product}
                onSelect={this.handleEditClick}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}