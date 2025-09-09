import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

// Layout ini hanya sebuah wrapper sederhana tanpa Navbar/Sidebar.
const AuthLayoutWrapper = styled.div`
  /* Anda bisa menambahkan styling latar belakang di sini jika perlu */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthLayout = () => {
  return (
    <AuthLayoutWrapper>
      <Outlet />
    </AuthLayoutWrapper>
  );
};

export default AuthLayout;