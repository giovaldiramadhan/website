import React from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import styled from "styled-components";

const StarRating = ({ rating_star = 0 }) => {
  const stars = Array.from({ length: 5 }, (_, idx) => {
    const val = idx + 0.5;
    return (
      <Star key={idx}>
        {rating_star >= idx + 1 ? (
          <BsStarFill />
        ) : rating_star >= val ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </Star>
    );
  });

  return (
    <StarsWrapper aria-label={`Rating: ${rating_star} out of 5`}>
      {stars}
    </StarsWrapper>
  );
};

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: #e59819;
  font-size: 14px;
  margin-right: 2px;
`;

export default StarRating;