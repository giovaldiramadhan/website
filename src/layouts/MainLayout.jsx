import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ minHeight: "calc(100vh - 200px)", padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
};

export default MainLayout;
