import React from "react";
import { Button, Col } from "react-bootstrap";
import "./style/Product.css";
export default function Product(props) {
  const { _id, image, title, description, availableSize, price } = props.data;
  return (
    <Col className="product p-5" sm="6" md="4">
      <div className="product__image">
        <img src={image} alt={title} />
      </div>
      <h2 className="product__title">{title}</h2>
      <div className="product__btn_price">
        <h1 className="product__price">${price}</h1>
        <Button size="sm" className="product__btn">
          Add to cart
        </Button>
      </div>
    </Col>
  );
}
