import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import axios from 'axios';

const FeaturedCourseCard = ({ course }) => {
  const { id, course_name, category, progress } = course;
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Panggil backend proxy kita
        const response = await axios.get(`http://localhost:5000/api/image-proxy?query=${category}`);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        // Jika gagal, gunakan gradasi sebagai fallback
        setImageUrl('gradient');
      }
    };
    fetchImage();
  }, [category]);

  const cardStyle = imageUrl && imageUrl !== 'gradient'
    ? { backgroundImage: `url(${imageUrl})` }
    : {};

  return (
    <CardLink to={`/courses/${id}`}>
      <CardWrapper style={cardStyle}>
        {!imageUrl || imageUrl === 'gradient' ? (
          <div className="gradient-background">
            <span className="initials">{course_name.charAt(0).toUpperCase()}</span>
          </div>
        ) : null}
        <div className="overlay">
          <div className="text-content">
            <p className="category">{category}</p>
            <h4 className="title">{course_name}</h4>
          </div>
          <div className="progress-container">
            <ProgressBar progress={progress || 0} />
          </div>
        </div>
      </CardWrapper>
    </CardLink>
  );
};

// ... (semua styled-components di bawah ini tetap sama)
const CardLink = styled(Link)`
  text-decoration: none;
`;

const CardWrapper = styled.div`
  min-width: 250px;
  height: 350px;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);

  &:hover {
    transform: scale(1.05);
  }

  .gradient-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #f87171 0%, #dc2626 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .initials {
    color: rgba(255, 255, 255, 0.7);
    font-size: 5em;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .overlay {
    position: relative;
    z-index: 2;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
  }

  .text-content {
    color: white;
  }

  .category {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 0.8;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
    margin-top: 5px;
  }

  .progress-container {
    margin-top: 15px;
    .progress-text {
        color: rgba(255, 255, 255, 0.8);
    }
  }
`;

export default FeaturedCourseCard;