import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Rate, Button, Spin } from 'antd';
import ProgressBar from "./ProgressBar";
import axios from 'axios';

const { Meta } = Card;

const Course = (props) => {
  const { id, course_name, creator, rating_star, rating_count, progress, category } = props;

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/image-proxy?query=${category}`);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        setImageUrl('gradient'); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [category]);

  const coverImage = loading
    ? React.createElement(
        'div',
        { style: { height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement(Spin, null)
      )
    : imageUrl !== 'gradient'
    ? React.createElement('img', {
        alt: course_name,
        src: imageUrl,
        style: { height: '180px', objectFit: 'cover' },
      })
    : React.createElement(
        'div',
        {
          style: {
            height: '180px',
            background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2em',
            fontWeight: 'bold',
            padding: '10px',
            textAlign: 'center',
          },
        },
        course_name.charAt(0).toUpperCase()
      );

  return React.createElement(
    Card,
    {
      hoverable: true,
      style: { height: '100%', display: 'flex', flexDirection: 'column' },
      cover: coverImage,
      actions: [
        React.createElement(
          Link,
          { to: `/courses/${id}`, key: 'view-course' },
          React.createElement(Button, { type: 'primary', block: true }, 'View Course')
        ),
      ],
    },
    React.createElement(
      'div',
      { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } },
      React.createElement(
        'div',
        null,
        React.createElement(Meta, { title: course_name, description: creator }),
        React.createElement(
          'div',
          { style: { marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' } },
          React.createElement('span', { style: { fontWeight: 'bold', color: '#faad14' } }, rating_star),
          React.createElement(Rate, { disabled: true, defaultValue: rating_star, allowHalf: true, style: { fontSize: 16 } }),
          React.createElement('span', { style: { color: '#888' } }, `(${rating_count})`)
        )
      ),
      React.createElement(
        'div',
        { style: { marginTop: '12px' } },
        React.createElement(ProgressBar, { progress: progress || 0 })
      )
    )
  );
};

export default Course;