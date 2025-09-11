import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget'; // <-- 1. Impor Chatbot

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget /> {/* <-- 2. Tambahkan Chatbot di sini */}
    </>
  );
};

export default MainLayout;