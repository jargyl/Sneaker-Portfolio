import { Button, Form, Input, message, Select } from "antd";
import React, { Component } from "react";

export default class ScrapeProduct extends Component {
  formRef = React.createRef();
  state = {
    loading: false,
  };

  handleSubmit = async (values) => {
    try {
      const { sku, size } = values;
      this.setState({ loading: true });
      const res = await fetch(`${process.env.API_URL}/product/scrape`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ sku, size }),
      });

      if (res.status === 200) {
        const product = await res.json();
        message.success("Product added successfully");
        this.props.onProductAdded(product);
        this.formRef.current.resetFields();
      } else {
        message.error("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      message.error("Internal server error");
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form
        onFinish={this.handleSubmit}
        ref={this.formRef}
        name="scrapeProduct"
        requiredMark={false}
        className="bg-slate-100 p-5 rounded-xl"
        autoComplete="off"
      >
        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: "Please enter SKU" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          className="mb-2 md:mb-5"
        >
          <Input placeholder="DD1391-100" />
        </Form.Item>
        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: "Please enter size" }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginLeft: "8px",
          }}
          className="md:mb-5"
        >
          <Input placeholder="42,5" />
        </Form.Item>
        <Form.Item className="flex w-full justify-center mb-0 ">
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            loading={this.state.loading}
          >
            Scrape Product
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
