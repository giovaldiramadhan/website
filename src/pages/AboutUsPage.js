import React from 'react';
import { Layout, Typography, Row, Col, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

const AboutUsPage = () => {
  return (
    <AboutWrapper>
      <Content style={{ padding: '50px' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
          <Title level={1}>About Elice Learning Platform</Title>
          <Paragraph style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto 40px auto' }}>
            Our mission is to provide a centralized, comprehensive learning experience. We believe in the power of knowledge and aim to make education accessible for everyone by integrating the best resources from across the web.
          </Paragraph>

          <Title level={2} style={{ marginTop: '60px' }}>Our Team</Title>
          <Row gutter={[32, 32]} justify="center" style={{ marginTop: '30px' }}>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable>
                <Meta
                  avatar={<Avatar size={64} icon={<UserOutlined />} />}
                  title="Giovaldi Ramadhan"
                  description="Full-Stack Developer"
                />
                <Paragraph style={{ marginTop: '15px' }}>
                  The architect and developer behind the Elice Learning Platform, passionate about creating intuitive and powerful web applications.
                </Paragraph>
              </Card>
            </Col>
            {/* Anda bisa menambahkan lebih banyak anggota tim di sini */}
          </Row>
        </div>
      </Content>
    </AboutWrapper>
  );
};

const AboutWrapper = styled.div`
  background-color: #f4f5f7;
`;

export default AboutUsPage;