import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaCommentDots, FaPaperPlane, FaTimes } from 'react-icons/fa';

// Logika sederhana untuk respons bot
const getBotResponse = (userInput) => {
  const text = userInput.toLowerCase().trim();
  if (text.includes('hello') || text.includes('hai')) {
    return 'Hello! How can I help you today?';
  }
  if (text.includes('course') || text.includes('kursus')) {
    return 'You can discover all our courses by clicking "Discover Courses" on the home page or using the search bar.';
  }
  if (text.includes('progress') || text.includes('progres')) {
    return 'You can track your progress on the "My Courses" page, accessible from the navbar once you are logged in.';
  }
  if (text.includes('thank you') || text.includes('terima kasih')) {
    return 'You\'re welcome!';
  }
  return "Sorry, I don't understand. You can ask me about 'courses' or 'progress'.";
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to Elice! How can I assist you?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatboxRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to the latest message
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { from: 'user', text: inputValue };
    const botResponse = { from: 'bot', text: getBotResponse(inputValue) };

    setMessages([...messages, userMessage, botResponse]);
    setInputValue('');
  };

  return (
    <>
      <ChatFab onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
      </ChatFab>
      
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <span>Elice Assistant</span>
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </ChatHeader>
          <ChatBox ref={chatboxRef}>
            {messages.map((msg, index) => (
              <ChatMessage key={index} from={msg.from}>
                {msg.text}
              </ChatMessage>
            ))}
          </ChatBox>
          <ChatInputForm onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit"><FaPaperPlane /></button>
          </ChatInputForm>
        </ChatWindow>
      )}
    </>
  );
};

const ChatFab = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--clr-purple);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 1000;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  height: 450px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background: var(--clr-purple);
  color: white;
  padding: 15px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
`;

const ChatBox = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatMessage = styled.div`
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 80%;
  align-self: ${props => (props.from === 'user' ? 'flex-end' : 'flex-start')};
  background-color: ${props => (props.from === 'user' ? 'var(--clr-purple)' : '#f0f0f0')};
  color: ${props => (props.from === 'user' ? 'white' : 'black')};
`;

const ChatInputForm = styled.form`
  display: flex;
  border-top: 1px solid #eee;

  input {
    flex: 1;
    border: none;
    padding: 15px;
    outline: none;
  }

  button {
    background: transparent;
    border: none;
    padding: 0 15px;
    cursor: pointer;
    color: var(--clr-purple);
  }
`;

export default ChatbotWidget;