import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCoursesContext } from '../context/courses_context';
import { Row, Col, Typography, Breadcrumb, Spin, Pagination } from 'antd';
import Course from "../components/Course";

const { Title } = Typography;
const PAGE_SIZE = 12; // Tampilkan 12 kursus per halaman

const AllCoursesPage = () => {
  const { courses } = useCoursesContext();
  const [currentPage, setCurrentPage] = useState(1);

  // Logika untuk pagination
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCourses = courses.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (courses.length === 0) {
    return <div style={{ textAlign: 'center', margin: '50px' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <Breadcrumb style={{ marginBottom: '24px' }}>
        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item>All Courses</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>All Courses</Title>

      <Row gutter={[24, 32]} style={{ marginTop: '24px' }}>
        {paginatedCourses.map((course) => (
          <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
            <Course {...course} />
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Pagination
          current={currentPage}
          total={courses.length}
          pageSize={PAGE_SIZE}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AllCoursesPage;