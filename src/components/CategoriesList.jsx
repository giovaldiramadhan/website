import React from "react";
import styled from "styled-components";
import { categories_images } from "../utils/images";
import Category from "./Category";
import { useCoursesContext } from "../context/courses_context";

const CategoriesList = () => {
  const { categories } = useCoursesContext();

  return React.createElement(
    CategoriesListWrapper,
    { style: { marginBottom: "3rem" } },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "categories-list-top" },
        React.createElement("h2", null, "Top Categories")
      ),
      React.createElement(
        "div",
        { className: "categories-list grid" },
        categories.map((category, idx) =>
          React.createElement(Category, {
            image: categories_images[idx],
            category: category,
            key: idx,
          })
        )
      )
    )
  );
};

const CategoriesListWrapper = styled.div`
  .categories-list-top {
    margin-bottom: 32px;
  }
  .categories-list {
    gap: 32px;
  }
  @media screen and (min-width: 600px) {
    .categories-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 800px) {
    .categories-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 992px) {
    .categories-list {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default CategoriesList;