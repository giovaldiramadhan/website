import React, { useEffect } from 'react'; // 'useState' sudah dihapus
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../context/user_context';
import { Form, Input, Button, Divider, message } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import AuthBg from '../assets/images/auth-bg.jpg'; // Pastikan file ini ada

const LoginPage = () => {
    const navigate = useNavigate();
    const { loginUser, isLoading, user } = useUserContext();
    const [form] = Form.useForm();
    
    useEffect(() => {
        if (user) {
          navigate('/');
        }
      }, [user, navigate]);

    const onFinish = async (values) => {
        const { email, password } = values;
        const result = await loginUser({ email, password });
        if (result.success) {
            navigate('/');
        } else {
            message.error(result.message || 'Login failed.');
        }
    };

    return (
        <AuthPanel>
            <div className="auth-image-side">
                <img src={AuthBg} alt="Learning Platform" />
                <div className="overlay-text">
                    <h2>Elice Learning Platform</h2>
                    <p>Discover Your Potential</p>
                </div>
            </div>
            <div className="auth-form-side">
                <Title>Welcome back</Title>
                <Subtext>
                    Don't have an account? <Link to="/register">Create one</Link>
                </Subtext>

                <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={isLoading}>
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
                
                <Divider>Or Log In with</Divider>
                
                <SocialLoginWrapper>
                    <Button icon={<GoogleOutlined />} block>
                        Google
                    </Button>
                    <Button icon={<FacebookOutlined />} block>
                        Facebook
                    </Button>
                </SocialLoginWrapper>
            </div>
        </AuthPanel>
    );
};

// ... (Styled components tidak perlu diubah, saya pindahkan ke sini agar rapi)

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Subtext = styled.p`
  margin-bottom: 30px;
  color: #555;
  a {
    color: var(--clr-purple);
    font-weight: 600;
  }
`;

const SocialLoginWrapper = styled.div`
    display: flex;
    gap: 16px;
    .ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const AuthPanel = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
  margin: 20px;

  .auth-image-side {
    flex: 1;
    position: relative;
    color: white;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .overlay-text {
        position: absolute;
        bottom: 30px;
        left: 30px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
  }

  .auth-form-side {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  @media(max-width: 768px) {
    .auth-image-side {
      display: none;
    }
    max-width: 450px;
  }
`;


export default LoginPage;