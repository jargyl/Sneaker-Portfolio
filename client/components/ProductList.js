import React, { Component } from "react";
import ProductListItem from "./ProductListItem";
import { Button, Form, Input, message, Modal } from "antd";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBarReact from "simplebar-react";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProducts: [],
      selectedProduct: null,
      editMode: false,
    };
  }

  handleEditClick = (product) => {
    this.setState({ selectedProduct: product, editMode: true });
  };

  handleCancelClick = () => {
    this.setState({ selectedProduct: null, editMode: false });
  };

  handleFormSubmit = async (e) => {
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
            name: this.state.selectedProduct.name,
            sku: this.state.selectedProduct.sku,
            size: this.state.selectedProduct.size,
            product_url: this.state.selectedProduct.product_url,
            image_url: this.state.selectedProduct.image_url,
            alt: this.state.selectedProduct.alt,
          }),
        }
      );
      if (res.status === 200) {
        this.props.onProductChanged(); // Refetch the products from the server
        this.setState({
          selectedProduct: null,
          editMode: false,
          selectedProduct: null,
        });
        message.success("Product updated successfully");
      } else {
        message.error("Failed to update product");
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
        console.log("Product deleted");
        this.props.onProductChanged(); // Refetch the products from the server
        this.setState({
          selectedProduct: null,
          searchText: "",
          editMode: false,
        });
        message.success("Product deleted successfully");
      } else {
        message.error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
    }
  };
  handleSearchInput = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { selectedProduct, editMode, searchQuery } = this.state;
    const { products } = this.props;
    let filteredProducts = products;
    if (searchQuery) {
      filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return (
      <div>
        {editMode && selectedProduct && (
          <Modal
            open={editMode}
            onCancel={this.handleCancelClick}
            footer={[
              <Button type="text" onClick={this.handleCancelClick}>
                Cancel
              </Button>,
              <Button
                type="primary"
                onClick={() => this.handleDeleteProduct(selectedProduct._id)}
                danger
              >
                Delete
              </Button>,

              <Button type="primary" htmlType="submit" form="edit-form">
                Update
              </Button>,
            ]}
          >
            <Form
              initialValues={this.state.selectedProduct}
              onValuesChange={(_, values) => {
                const { selectedProduct } = this.state;
                this.setState({
                  selectedProduct: { ...selectedProduct, ...values },
                });
              }}
              onFinish={this.handleFormSubmit}
              id="edit-form"
            >
              <Form.Item label="Name" name="name">
                <Input value={this.state.selectedProduct.name} />
              </Form.Item>
              <Form.Item
                label="SKU"
                name="sku"
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              >
                <Input value={this.state.selectedProduct.sku} />
              </Form.Item>
              <Form.Item
                label="Size"
                name="size"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Input value={this.state.selectedProduct.size} />
              </Form.Item>
              <Form.Item label="Product URL" name="product_url">
                <Input value={this.state.selectedProduct.product_url} />
              </Form.Item>
              <Form.Item label="Image URL" name="image_url">
                <Input value={this.state.selectedProduct.image_url} />
              </Form.Item>
              <Form.Item label="Alt" name="alt">
                <Input value={this.state.selectedProduct.alt} />
              </Form.Item>
            </Form>
          </Modal>
        )}
        <div className="bg-slate-100">
          <Input.Search
            placeholder="Enter search text"
            onChange={this.handleSearchInput}
            allowClear={true}
          />
        </div>
        <SimpleBarReact className="bg-slate-100 ">
          {filteredProducts.map((product) => (
            <ProductListItem
              key={product._id}
              product={product}
              onSelect={this.handleEditClick}
            />
          ))}
        </SimpleBarReact>
      </div>
    );
  }
}
