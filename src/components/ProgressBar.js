import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ progress }) => {
  // Memastikan progress antara 0 dan 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <ProgressBarWrapper>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${clampedProgress}%` }} />
      </div>
      <span className="progress-text">{clampedProgress}% Complete</span>
    </ProgressBarWrapper>
  );
};

const ProgressBarWrapper = styled.div`
  margin-top: 12px;
  .progress-bar-container {
    width: 100%;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background-color: var(--clr-purple);
    border-radius: 4px;
    transition: width 0.3s ease-in-out;
  }
  .progress-text {
    font-size: 12px;
    font-weight: 500;
    color: #555;
    margin-top: 4px;
    display: block;
  }
`;

export default ProgressBar;