import React from "react";
import styled from "styled-components";
import { other_images } from "../utils/images";

const Hero = ({ 
  title = "Learning for All", 
  paragraphs = [
    "Find the best learning resources from various sources, integrated just for you.",
    "Save content to your personal library and monitor your progress as you master new skills."
  ] 
}) => {
  return (
    <HeroWrapper className="bg-black" role="banner" aria-label="Hero section">
      <div className="container h-100 flex">
        <div className="hero-content">
          <h1>{title}</h1>
          {paragraphs.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </div>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  background: url(${other_images.hero_img}) center/cover no-repeat;
  height: 300px;

  .container {
    .hero-content {
      background-color: var(--clr-white);
      max-width: 400px;
      width: 100%;
      margin-left: 0;
      padding: 20px;

      h1 {
        font-size: 32px;
        margin-bottom: 5px;
        white-space: nowrap;
      }
      p {
        font-size: 15px;
      }
    }
  }

  @media (max-width: 768px) {
    height: 200px;
    .hero-content {
      max-width: 100%;
      padding: 15px;
      h1 {
        font-size: 24px;
      }
      p {
        font-size: 13px;
      }
    }
  }
`;

export default Hero;