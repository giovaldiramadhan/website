import React from "react";
import styled from "styled-components";
import { other_images } from "../utils/images";

const Hero = () => {
  return (
    <HeroWrapper className="bg-black">
      <div className="container h-100 flex">
        <div className="hero-content">
          {/* Ganti teks di bawah ini */}
          <h1>Learning for All</h1>
          <p>
            Find the best learning resources from various sources, integrated just for you.
          </p>
          <p>
            Save content to your personal library and monitor your progress as you master new skills.
          </p>
          {/* Batas teks yang diganti */}
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
`;

export default Hero;
