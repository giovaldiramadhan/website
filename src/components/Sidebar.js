import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useSidebarContext } from '../context/sidebar_context';
import { useUserContext } from '../context/user_context';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Calendar, Divider } from 'antd'; // 1. Impor Calendar dan Divider dari Ant Design
import axios from 'axios';

const Sidebar = () => {
  const { closeSidebar, isSidebarOpen } = useSidebarContext();
  const { user } = useUserContext();
  const [progressData, setProgressData] = useState({ percentage: 0 });

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.token) return;

      try {
        const response = await axios.get('http://localhost:5000/api/user/courses', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        
        const enrolledCourses = response.data;
        if (enrolledCourses.length > 0) {
          const totalProgress = enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0);
          const averageProgress = Math.round(totalProgress / enrolledCourses.length);
          setProgressData({ percentage: averageProgress });
        } else {
          setProgressData({ percentage: 0 });
        }
      } catch (error) {
        console.error("Failed to fetch progress", error);
        setProgressData({ percentage: 0 });
      }
    };

    if (isSidebarOpen) {
      fetchProgress();
    }
  }, [user, isSidebarOpen]);

  const data = [{ name: 'Progress', value: progressData.percentage, fill: 'var(--clr-purple)' }];

  return (
    <SidebarWrapper className={`bg-white ${isSidebarOpen ? "show-sidebar" : ""}`}>
      <button type="button" className="sidebar-close-btn" onClick={closeSidebar}>
        <MdClose />
      </button>
      <div className="sidebar-content">
        <h6 className="fs-18">My Overall Progress</h6>
        
        <ChartContainer>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="90%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={10}
                angleAxisId={0}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="progress-label"
              >
                {`${progressData.percentage}%`}
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <p className='progress-summary'>
          You have completed {progressData.percentage}% of all your enrolled courses. Keep up the great work!
        </p>
        
        <Divider /> {/* 2. Tambahkan garis pemisah */}

        {/* 3. Tambahkan komponen Kalender di sini */}
        <CalendarContainer>
            <Calendar fullscreen={false} />
        </CalendarContainer>

      </div>
    </SidebarWrapper>
  );
};

const CalendarContainer = styled.div`
    width: 100%;
    .ant-picker-calendar-header {
        padding: 10px;
    }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  margin: 20px 0;

  .progress-label {
    font-size: 2.5rem;
    font-weight: 700;
    fill: var(--clr-dark);
  }
`;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  z-index: 99999;
  height: 100%;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  transform: translateX(100%);
  transition: var(--transition);

  &.show-sidebar {
    transform: translateX(0);
  }
  
  .sidebar-close-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    border: 2px solid var(--clr-black);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    transition: all 300ms ease-in-out;
  }
  .sidebar-close-btn:hover {
    background-color: var(--clr-black);
    color: var(--clr-white);
  }
  .sidebar-content {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h6 {
      margin-bottom: 16px;
    }

    .progress-summary {
        text-align: center;
        font-size: 14px;
        color: #555;
        line-height: 1.6;
    }
  }
`;

export default Sidebar;