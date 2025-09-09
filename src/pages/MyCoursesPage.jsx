import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Spin, Empty, Breadcrumb } from 'antd';
import axios from 'axios';
import { useUserContext } from '../context/user_context';
import Course from '../components/Course';

const { Title } = Typography;

const MyCoursesPage = () => {
  const { user } = useUserContext();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user?.token) return;

      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/user/courses', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch enrolled courses", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  if (isLoading) {
    return <div style={{ textAlign: 'center', margin: '50px' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Breadcrumb style={{ marginBottom: '24px' }}>
            <Breadcrumb.Item>
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>My Courses</Breadcrumb.Item>
        </Breadcrumb>

      <Title level={2}>My Learning</Title>
      
      {enrolledCourses.length > 0 ? (
        <Row gutter={[24, 32]} style={{ marginTop: '24px' }}>
          {enrolledCourses.map((course) => (
            <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
              <Course {...course} progress={course.progress} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="You haven't enrolled in any courses yet. Start by discovering a new course!"
          style={{ marginTop: '80px' }}
        >
            <Link to="/courses">
                <button className="ant-btn ant-btn-primary">Discover Courses</button>
            </Link>
        </Empty>
      )}
    </div>
  );
};

export default MyCoursesPage;