import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCoursesContext } from '../context/courses_context';
import { useUserContext } from '../context/user_context';
import FeaturedCourseCard from '../components/FeaturedCourseCard';
import HomeBg from '../assets/images/home-bg.jpg';
import { Spin } from 'antd';

const HomePage = () => {
  const { courses } = useCoursesContext();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    navigate('/courses'); 
  };

  if (!courses || courses.length === 0) {
    return (
      <LoadingWrapper>
        <Spin size="large" />
      </LoadingWrapper>
    );
  }

  const featuredCourses = courses.slice(0, 7);

  return (
    <HomeWrapper style={{ backgroundImage: `url(${HomeBg})` }}>
      <div className="overlay-dark"></div>
      <ContentWrapper className="container">
        <HeroText>
          <p className="welcome-text">Welcome back, {user?.name || 'Learner'}!</p>
          <h1>Start Your Learning Journey</h1>
          <p className="subtitle">
            Pick up where you left off or discover something new. Your path to mastery continues here.
          </p>
          <button className="discover-btn" onClick={handleDiscoverClick}>
            Discover Courses
          </button>
        </HeroText>

        <CourseCarousel>
          <div className="carousel-track">
            {featuredCourses.map(course => (
              <FeaturedCourseCard key={course.id} course={course} />
            ))}
          </div>
        </CourseCarousel>
      </ContentWrapper>
    </HomeWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 75px);
`;

const HomeWrapper = styled.div`
  min-height: calc(100vh - 75px);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  padding: 40px 0;
  overflow: hidden;

  .overlay-dark {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  gap: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

const HeroText = styled.div`
  color: white;
  
  .welcome-text {
    font-weight: 600;
    color: var(--clr-purple);
    text-transform: uppercase;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 10px 0;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 450px;
    margin-bottom: 30px;

    @media (max-width: 992px) {
      margin: 0 auto 30px auto;
    }
  }

  .discover-btn {
    background: transparent;
    border: 2px solid white;
    color: white;
    padding: 12px 30px;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: white;
      color: black;
    }
  }
`;

const CourseCarousel = styled.div`
  overflow-x: auto;
  padding: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  .carousel-track {
    display: flex;
    gap: 20px;
  }
`;

export default HomePage;