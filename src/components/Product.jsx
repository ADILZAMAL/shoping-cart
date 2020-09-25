import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import "../style/Product.css";
import Modal from "react-modal";
import { addToCart } from "../store/product";
import { useDispatch } from "react-redux";
export default function Product(props) {
  const dispatch = useDispatch();
  const { _id, image, title, description, availableSizes, price } = props.data;
  const [product, setProduct] = useState(null);
  const openModal = (product) => {
    setProduct(product);
  };
  const closeModal = () => {
    setProduct(null);
  };
  return (
    <Col className="product p-5 " sm="6" md="4">
      <div
        className="product__image"
        onClick={() => {
          setProduct({
            _id,
            image,
            title,
            description,
            availableSizes,
            price,
          });
        }}
      >
        <img src={image} alt={title} />
      </div>
      <h2 className="product__title">{title}</h2>
      <div className="product__btn_price">
        <h1 className="product__price">${price}</h1>
        <Button
          onClick={() => {
            dispatch(
              addToCart({
                _id,
                image,
                title,
                description,
                availableSizes,
                price,
              })
            );
          }}
          size="sm"
          className="product__btn"
        >
          Add to cart
        </Button>
      </div>
      {product && (
        <Modal isOpen={product} onRequestClose={closeModal}>
          <Zoom>
            <div className="product-details d-flex  align-items-center">
              <img src={product.image} className="d-block" />
              <div className="m-3 product-details__description ">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <h5>
                  Available Sizes:
                  {product.availableSizes.map((x) => {
                    return (
                      <Button size="sm" className="m-1" variant="info">
                        {x}
                      </Button>
                    );
                  })}
                </h5>
              </div>
            </div>
            <div className="d-flex  justify-content-center align-items-center">
              <h3>${product.price}</h3>
              <Button
                onClick={() => {
                  dispatch(addToCart(product));
                  closeModal();
                }}
                className="m-3"
                variant="warning"
              >
                Add to Cart
              </Button>
            </div>
          </Zoom>
          <div className=" d-flex justify-content-center">
            <Button onClick={closeModal} variant="secondary">
              close
            </Button>
          </div>
        </Modal>
      )}
    </Col>
  );
}
