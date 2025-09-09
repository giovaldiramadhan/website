import React, { useState, useMemo } from 'react';
import { Typography, Row, Col, Pagination, Tabs } from 'antd';
import { useCoursesContext } from '../context/courses_context';
import Course from './Course';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const PAGE_SIZE = 8;

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
    setCurrentPage(1);
  };

  const activeCategory = categories[parseInt(activeTabKey, 10)];
  const filteredCourses = useMemo(
    () => courses.filter((course) => course.category === activeCategory),
    [courses, activeCategory]
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCourses = useMemo(
    () => filteredCourses.slice(startIndex, startIndex + PAGE_SIZE),
    [filteredCourses, startIndex]
  );

  return (
    <div style={{ marginTop: '30px' }}>
      <Title level={2}>A Broad Selection of Courses</Title>
      <Paragraph>
        Explore curated learning materials and resources integrated from top educational platforms.
      </Paragraph>

      <Tabs activeKey={activeTabKey} type="card" onChange={handleTabChange}>
        {categories.map((category, index) => (
          <TabPane tab={category.toUpperCase()} key={String(index)}>
            {paginatedCourses.length > 0 ? (
              <Row gutter={[24, 32]} style={{ marginTop: '24px' }}>
                {paginatedCourses.map((course) => (
                  <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                    <Course {...course} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Paragraph style={{ marginTop: '20px' }}>
                No courses available in this category.
              </Paragraph>
            )}

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