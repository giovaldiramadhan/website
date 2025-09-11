import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logoElice from "../assets/images/logo_elice.png";

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/">
              <img src={logoElice} alt="Elice Platform Logo" />
            </Link>
            <p className="description">
              Discover, save, and track your learning journey with our curated resources.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Elice Learning Platform. All Rights Reserved.</p>
        </div>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #1c1d1f;
  color: #fff;
  padding: 40px 0 20px 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
  }

  .footer-brand img {
    width: 100px;
    margin-bottom: 15px;
  }

  .description {
    font-size: 14px;
    color: #a0a0a0;
    line-height: 1.6;
  }

  h4 {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .footer-links ul {
    list-style: none;
    padding: 0;
  }

  .footer-links li {
    margin-bottom: 10px;
  }

  .footer-links a {
    color: #a0a0a0;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--clr-purple);
    }
  }

  .social-icons {
    display: flex;
    gap: 15px;

    a {
      color: #a0a0a0;
      font-size: 20px;
      transition: color 0.3s ease;
      
      &:hover {
        color: var(--clr-purple);
      }
    }
  }

  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #333;
    font-size: 14px;
    color: #a0a0a0;
  }
`;

export default Footer;