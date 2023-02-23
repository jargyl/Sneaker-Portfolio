import { Button } from "antd";
import Image from "next/image";
import React, { Component } from "react";
import { TbEdit } from "react-icons/tb";

export default class ProductListItem extends Component {
  handleClick = () => {
    const { product, onSelect } = this.props;
    onSelect(product);
  };

  render() {
    const { product } = this.props;
    return (
      <div className="flex justify-between px-3 items-center border-solid border-t-0 border-x-0 border-b-2 border-gray-300 m-2">
        <div className="flex items-center gap-3">
          <Image
            src={`https://wsrv.nl/?url=${product.image_url}&h=30&dpr=2&l=6&output=webp`}
            alt={`${product.alt}`}
            height={50}
            width={85}
          />
          <div className="">
            <p className="font-bold">{product.name}</p>
            <p>{product.sku}</p>
            <p>{product.size}</p>
          </div>
        </div>
        <Button onClick={this.handleClick} shape="circle">
          <TbEdit />
        </Button>
      </div>
    );
  }
}
