import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Typography, Spin, Empty } from 'antd';
import axios from 'axios';
import Course from "../components/Course";

const { Title } = Typography;

const SearchPage = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (isLoading) {
    return <div style={{ textAlign: 'center', margin: '50px' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Search Results for: "{query}"</Title>
      {results.length > 0 ? (
        <Row gutter={[24, 32]} style={{ marginTop: '24px' }}>
          {results.map((course) => (
            <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
              <Course {...course} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description={`No courses found for your search "${query}".`}
          style={{ marginTop: '80px' }}
        />
      )}
    </div>
  );
};

export default SearchPage;