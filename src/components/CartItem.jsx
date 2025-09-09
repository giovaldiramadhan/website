import React from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import PropTypes from "prop-types";

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useCartContext();
  const { image, course_name, creator, discounted_price, category, courseID } = cartItem;

  return React.createElement(
    CartItemWrapper,
    { className: "grid" },
    React.createElement(
      "div",
      { className: "cart-item-img" },
      React.createElement("img", { src: image, alt: course_name })
    ),
    React.createElement(
      "div",
      { className: "cart-item-info" },
      React.createElement("p", { className: "fw-7 fs-15" }, course_name),
      React.createElement(
        "span",
        { className: "cart-item-creator fs-13 opacity-09" },
        `By ${creator}`
      ),
      React.createElement("div", { className: "fw-7 text-purple" }, `$${discounted_price}`),
      React.createElement(
        "div",
        {
          className:
            "cart-item-category bg-orange fs-12 d-inline-block text-capitalize text-white fw-7",
        },
        category
      ),
      React.createElement("br"),
      React.createElement(
        "button",
        {
          type: "button",
          className: "remove-btn fs-13 text-dark fw-6",
          onClick: () => removeFromCart(courseID),
        },
        React.createElement("span", null, React.createElement(FaTrashAlt)),
        " Remove"
      )
    )
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    image: PropTypes.string.isRequired,
    course_name: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    discounted_price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    courseID: PropTypes.string.isRequired,
  }).isRequired,
};

const CartItemWrapper = styled.div`
  grid-template-columns: 110px auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;

  .cart-item-img {
    width: 100px;
    height: 100px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .cart-item-category {
    padding: 0px 10px;
    border-radius: 6px;
  }

  .remove-btn {
    font-size: 1.3rem;
    margin-top: 16px;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: #f00;
    }
  }
`;

export default CartItem;