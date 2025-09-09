import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CalendarWidget = React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const changeMonth = (amount) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const renderDays = () => {
    const today = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Adjust to make Monday the first day (0 = Sun, 1 = Mon, ..., 6 = Sat)
    const startOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        today.getDate() === i &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      days.push(
        React.createElement(
          'div',
          { key: i, className: `day ${isToday ? 'today' : ''}` },
          i
        )
      );
    }

    // Add empty divs for alignment
    for (let i = 0; i < startOffset; i++) {
      days.unshift(
        React.createElement('div', {
          key: `empty-${i}`,
          className: 'day empty'
        })
      );
    }

    return days;
  };

  return React.createElement(
    CalendarWrapper,
    null,
    React.createElement(
      'div',
      { className: 'header' },
      React.createElement(
        'button',
        { type: 'button', onClick: () => changeMonth(-1) },
        React.createElement(FaChevronLeft)
      ),
      React.createElement(
        'span',
        null,
        `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
      ),
      React.createElement(
        'button',
        { type: 'button', onClick: () => changeMonth(1) },
        React.createElement(FaChevronRight)
      )
    ),
    React.createElement(
      'div',
      { className: 'days-of-week' },
      daysOfWeek.map((day) =>
        React.createElement('div', { key: day }, day)
      )
    ),
    React.createElement('div', { className: 'days-grid' }, renderDays())
  );
};

const CalendarWrapper = styled.div`
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 320px;
  font-family: var(--base-font);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    font-weight: 700;
    font-size: 16px;

    button {
      background: transparent;
      border: none;
      cursor: pointer;
      color: #888;

      &:hover {
        color: var(--clr-purple);
      }
    }
  }

  .days-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: #aaa;
    margin-bottom: 10px;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;

    .day {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      font-size: 14px;

      &.today {
        background-color: #e6d4f7;
        color: var(--clr-purple);
        border-radius: 8px;
        font-weight: 700;
      }

      &.empty {
        visibility: hidden;
      }
    }
  }
`;

export default CalendarWidget;
