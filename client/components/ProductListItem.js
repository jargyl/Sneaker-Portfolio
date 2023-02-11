import React, { Component } from "react";

export default class ProductListItem extends Component {
  handleClick = () => {
    const { product, onSelect } = this.props;
    onSelect(product);
  };

  render() {
    const { product } = this.props;
    return (
      <div>
        <h3>{product.name}</h3>
        <p>{product.sku}</p>
        <p>{product.size}</p>
        <button onClick={this.handleClick}>Edit</button>
      </div>
    );
  }
}
