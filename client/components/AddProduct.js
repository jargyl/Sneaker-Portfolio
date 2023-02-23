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
    this.formRef = React.createRef();
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
    const sku = this.state.sku.toUpperCase();
    const alt = this.state.product_url.split("/").pop();
    const image_url = `https://cdn.restocks.net/cdn-cgi/image/width=400/storage/images/products/${sku}/1.png`;
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:3000/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sku: sku,
          name: this.state.name,
          size: this.state.size,
          product_url: this.state.product_url,
          image_url: image_url,
          alt: alt,
        }),
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
          this.setState(
            {
              sku: "",
              name: "",
              size: "",
              product_url: "",
              image_url: "",
              alt: "",
            },
            () => {
              this.formRef.current.resetFields();
            }
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Form
        ref={this.formRef}
        name="addProduct"
        initialValues={this.state}
        onValuesChange={(_, values) => this.setState(values)}
        onFinish={this.handleSubmit}
        validateMessages={validateMessages}
        autoComplete="off"
        requiredMark={false}
        className="bg-slate-100 p-5 rounded-xl"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
          className="mb-2 md:mb-5"
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
          className="mb-2 md:mb-5"
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
          className="mb-2 md:mb-5"
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
          className="md:mb-5"
        >
          <Input
            placeholder="https://restocks.net/nl/p/nike-dunk-low-retro-white-black-2021"
            value={this.state.product_url}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item className="flex w-full justify-center mb-0 ">
          <Button type="primary" shape="round" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
