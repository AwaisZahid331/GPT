/* The provided code is a React component named `App` that serves as the main component for an
application called AssistMe. Here is a breakdown of what the code is doing: */

import React, { useState } from 'react';
import './App.css';
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';
import { GoogleGenerativeAI } from '@google/generative-ai';

const App = () => {
  const [message, setMessage] = useState('');
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);

  const hitRequest = () => {
    if (message.trim()) {
      generateResponse(message);
    } else {
      alert('You must write something...!');
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyDlsx6twz-CQxb-cG2m72Su8UGny18U16o');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(msg);

      const newMessages = [
        ...messages,
        { type: 'userMsg', text: msg },
        { type: 'responseMsg', text: result.response.text() },
      ];

      setMessages(newMessages);
      setisResponseScreen(true);
      setMessage('');
    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
  };

  return (
    <div className="container-fluid w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
      {isResponseScreen ? (
        <div className="h-[80vh] flex flex-col">
          <div className="header pt-[25px] flex items-center justify-between w-[100vw] px-[300px]">
            <h2 className="text-2xl">AssistMe</h2>
            <button
              id="newChatBtn"
              className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]"
              onClick={newChat}
            >
              New Chat
            </button>
          </div>

          <div className="messages overflow-y-auto px-[300px] h-full">
            {messages.map((msg, index) => (
              <div key={index} className={msg.type === 'userMsg' ? 'userMsg' : 'responseMsg'}>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="middle h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-4xl">Assist_Me_Ai</h1>
          <div className="boxes mt-[30px] flex items-center gap-2">
            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
              <p className="text-[18px]">What is coding?<br />How we can learn it.</p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <IoCodeSlash />
              </i>
            </div>
            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
              <p className="text-[18px]">Which is the red<br />planet of the solar<br />system?</p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <BiPlanet />
              </i>
            </div>
            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
              <p className="text-[18px]">In which year Python<br />was invented?</p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <FaPython />
              </i>
            </div>
            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
              <p className="text-[18px]">How can we use<br />AI for adoption?</p>
              <i className="absolute right-3 bottom-3 text-[18px]">
                <TbMessageChatbot />
              </i>
            </div>
          </div>
        </div>
      )}

      <div className="bottom w-[100%] flex flex-col items-center fixed bottom-0 bg-[#0E0E0E] z-50">
        <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none"
            placeholder="Write your message here..."
            id="messageBox"
          />
          {message && (
            <i className="text-green-500 text-[20px] mr-5 cursor-pointer" onClick={hitRequest}>
              <IoSend />
            </i>
          )}
        </div>
        <p className="text-[gray] text-[14px] my-4">
          AssistMe is developed by Mo. Awais Zahid. This AI uses the Gemini API to provide responses.
        </p>
      </div>
    </div>
  );
};

export default A