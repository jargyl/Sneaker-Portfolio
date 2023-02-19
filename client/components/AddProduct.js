import React, { Component } from "react";
import { Button, Form, Input, message } from "antd";

const validateMessages = {
  required: "Please fill in all required fields",
  types: {
    url: "Please enter a valid URL",
  },
};

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

  handleSubmit = async (e) => {
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
        .then((res) => {
          if (res.status === 200) {
            message.success("Product added successfully");
          } else {
            message.error("Failed to add product");
          }
          return res.json();
        })
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
  };

  render() {
    return (
      <Form
        name="addProduct"
        initialValues={this.state}
        onValuesChange={(_, values) => this.setState(values)}
        onFinish={this.handleSubmit}
        validateMessages={validateMessages}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="Nike Dunk Low Retro White Black (2021)"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="SKU"
          name="sku"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input
            placeholder="DD1391-100"
            value={this.state.sku}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Size"
          name="size"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input
            placeholder="42,5"
            value={this.state.size}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Product URL"
          name="product_url"
          rules={[
            {
              required: true,
              type: "url",
            },
          ]}
        >
          <Input
            placeholder="https://restocks.net/nl/p/nike-dunk-low-retro-white-black-2021"
            value={this.state.product_url}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Image URL"
          name="image_url"
          rules={[
            {
              required: true,
              type: "url",
            },
          ]}
        >
          <Input
            placeholder="https://cdn.restocks.net/cdn-cgi/image/width=400/storage/images/products/DD1391-100/1.png"
            value={this.state.image_url}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Alt"
          name="alt"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="nike-dunk-low-retro-white-black-2021"
            value={this.state.alt}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
