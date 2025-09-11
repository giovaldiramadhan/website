import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Rate, Button, Spin } from 'antd';
import ProgressBar from "./ProgressBar";
import axios from 'axios';

const { Meta } = Card;

const Course = (props) => {
  const {
    id,
    course_name,
    creator,
    rating_star,
    rating_count,
    progress,
    category
  } = props;
  
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/image-proxy?query=${category}`);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        setImageUrl('gradient'); // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [category]);

  const coverImage = (
    loading ? <div style={{height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Spin /></div> :
    imageUrl !== 'gradient' ? <img alt={course_name} src={imageUrl} style={{ height: '180px', objectFit: 'cover' }} /> :
    <div style={{
        height: '180px',
        background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
        fontSize: '2em', fontWeight: 'bold', padding: '10px', textAlign: 'center'
    }}>
        {course_name.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <Card
      hoverable
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      cover={coverImage}
      actions={[
        <Link to={`/courses/${id}`}>
          <Button type="primary" block>View Course</Button>
        </Link>
      ]}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Meta title={course_name} description={creator} />
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#faad14' }}>{rating_star}</span>
            <Rate disabled defaultValue={rating_star} allowHalf style={{ fontSize: 16 }}/>
            <span style={{ color: '#888' }}>({rating_count})</span>
          </div>
        </div>
        <div style={{ marginTop: '12px' }}>
           <ProgressBar progress={progress || 0} />
        </div>
      </div>
    </Card>
  );
};

export default Course;