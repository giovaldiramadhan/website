import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Category = ({ image, category }) => {
  return React.createElement(
    Link,
    { to: `/category/${category}` },
    React.createElement(
      CategoryItemWrapper,
      { className: "flex flex-column bg-alice-blue" },
      React.createElement(
        "div",
        { className: "category-item-img" },
        React.createElement("img", { src: image, alt: category })
      ),
      React.createElement(
        "div",
        { className: "category-item-name" },
        React.createElement("h6", null, category)
      )
    )
  );
};

const CategoryItemWrapper = styled.div`
  padding: 20px;
  border: 1px solid transparent;
  transition: var(--transition);

  .category-item-img {
    img {
      max-width: 110px;
    }
  }

  .category-item-name {
    margin-top: 24px;

    h6 {
      font-size: 15px;
    }
  }

  &:hover {
    border: 1px solid var(--clr-purple);
  }
`;

export default Category;
