import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { addFilter } from "../store/product";
import "../style/Filter.css";
import { useDispatch, useSelector } from "react-redux";
import { sizeSelector, addSortBy, sortSelector } from "../store/product";
export default function Filter({ count }) {
  const dispatch = useDispatch();
  const size = useSelector(sizeSelector);
  const sort = useSelector(sortSelector);
  return (
    <Container className="filter p-3">
      <Row>
        <Col>{count} Products</Col>
        <Col>
          Order{" "}
          <select
            value={sort}
            onChange={(event) => {
              dispatch(addSortBy({ sort: event.target.value }));
            }}
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </Col>
        <Col>
          Filter{" "}
          <select
            value={size}
            onChange={(event) => {
              dispatch(addFilter({ size: event.target.value }));
            }}
          >
            <option value="ALL">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXl</option>
          </select>
        </Col>
      </Row>
    </Container>
  );
}
