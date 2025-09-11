import React, { useState } from 'react';
import { Typography, Row, Col, Pagination, Tabs } from 'antd';
import { useCoursesContext } from '../context/courses_context';
import Course from './Course';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const PAGE_SIZE = 8; // Tampilkan 8 kursus per halaman

const CourseList = () => {
  const { courses, categories } = useCoursesContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTabKey, setActiveTabKey] = useState('0');

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleTabChange = (key) => {
      setActiveTabKey(key);
      setCurrentPage(1); // Reset ke halaman pertama saat ganti tab
  }

  // Menentukan kursus yang akan ditampilkan berdasarkan tab dan halaman
  const activeCategory = categories[parseInt(activeTabKey, 10)];
  const filteredCourses = courses.filter(course => course.category === activeCategory);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div style={{ marginTop: '30px' }}>
      <Title level={2}>A Broad Selection of Courses</Title>
      <Paragraph>
        Explore curated learning materials and resources integrated from top educational platforms.
      </Paragraph>

      <Tabs defaultActiveKey="0" type="card" onChange={handleTabChange}>
        {categories.map((category, index) => (
          <TabPane tab={category.toUpperCase()} key={String(index)}>
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
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CourseList;