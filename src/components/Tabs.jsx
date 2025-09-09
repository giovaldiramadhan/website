import React, { useState } from 'react';
import styled from "styled-components";
import Course from "./Course";
import { PYTHON, WEB_DEVELOPMENT, DATA_SCIENCE, AWS, DESIGN, MARKETING } from "../utils/constants";
import courses from '../utils/data';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(PYTHON);

  const tabHandler = (category) => {
    setActiveTab(category);
  };

  return (
    <TabsWrapper>
      <div className="tabs">
        <ul className="flex flex-wrap">
          {[ 
            { label: "Python", value: PYTHON },
            { label: "Web Development", value: WEB_DEVELOPMENT },
            { label: "Data Science", value: DATA_SCIENCE },
            { label: "AWS Certification", value: AWS },
            { label: "Design", value: DESIGN },
            { label: "Marketing", value: MARKETING }
          ].map((tab) => (
            <li className="tabs-head-item" key={tab.value}>
              <button
                type="button"
                className={`tab-btn ${activeTab === tab.value ? "active" : ""}`}
                onClick={() => tabHandler(tab.value)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tabs-body">
          {courses
            .filter((course) => course.category === activeTab)
            .map((course) => (
              <Course key={course.id} {...course} />
            ))}
        </div>
      </div>
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  .tabs {
    margin-top: 16px;

    .tabs-head-item button {
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;
      background: transparent;
      cursor: pointer;

      &:hover {
        background-color: var(--clr-black);
        color: var(--clr-white);
      }

      &.active {
        background-color: var(--clr-purple);
        color: var(--clr-white);
        border-color: var(--clr-purple);
      }
    }

    .tabs-body {
      margin-top: 32px;
    }

    @media screen and (min-width: 600px) {
      .tabs-body {
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px) {
      .tabs-body {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px) {
      .tabs-body {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default Tabs;