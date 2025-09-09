import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ progress, color = "var(--clr-purple)", showText = true }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <ProgressBarWrapper>
      <div 
        className="progress-bar-container"
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div 
          className="progress-bar-fill" 
          style={{ width: `${clampedProgress}%`, backgroundColor: color }} 
        />
      </div>
      {showText && (
        <span className="progress-text">{clampedProgress}% Complete</span>
      )}
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
