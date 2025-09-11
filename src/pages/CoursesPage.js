import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCoursesContext } from '../context/courses_context';
import { Row, Col, Typography, Breadcrumb, Empty, Spin, Pagination } from 'antd';
import Course from "../components/Course";

const { Title } = Typography;
const PAGE_SIZE = 8; // Tampilkan 8 kursus per halaman

const CoursesPage = () => {
  const { category } = useParams();
  const { courses } = useCoursesContext();

  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter kursus berdasarkan kategori dari URL
  const filteredCourses = courses.filter(course => course.category === category);

  // Hitung kursus yang akan ditampilkan di halaman saat ini
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + PAGE_SIZE);

  // Fungsi untuk menangani pergantian halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Tampilkan loading jika data kursus dari context belum siap
  if (courses.length === 0) {
    return <div style={{ textAlign: 'center', margin: '50px' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      
      <Breadcrumb style={{ marginBottom: '24px' }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ textTransform: 'capitalize' }}>{category}</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2} style={{ textTransform: 'capitalize' }}>
        {category} Courses
      </Title>

      {paginatedCourses.length > 0 ? (
        <>
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
              total={filteredCourses.length}
              pageSize={PAGE_SIZE}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <Empty
          description={`No courses found in the "${category}" category.`}
          style={{ marginTop: '80px' }}
        />
      )}
    </div>
  );
}

export default CoursesPage;