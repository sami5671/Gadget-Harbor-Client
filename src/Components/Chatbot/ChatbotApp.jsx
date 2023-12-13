import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import Chatbot from "react-simple-chatbot";
import { Segment, Button } from "semantic-ui-react";
import useAuth from "../../Hooks/useAuth";

const ChatbotApp = () => {
  const auth = useAuth();
  const [isChatbotVisible, setIsChatbotVisible] = useState(true);

  const toggleChatbotVisibility = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const steps = [
    {
      id: "user_id",
      message: "Hello, there, how can I help you",
      trigger: "Ask Name",
    },
    {
      id: "Ask Name",
      message: "Please enter your name",
      trigger: "waiting",
    },
    {
      id: "waiting",
      user: true,
      trigger: "name",
    },
    {
      id: "name",
      message: "Hi {previousValue}, Please select your issue",
      trigger: "issues",
    },
    {
      id: "issues",
      options: [
        { value: "visited", label: "visited", trigger: "visited" },
        {
          value: "Did not find any information",
          label: "Did not find any information",
          trigger: "Did not find any information",
        },
      ],
    },
    {
      id: "visited",
      message: "Thanks for visiting our React website",
      end: true,
    },
    {
      id: "Did not find any information",
      message: "The moderator will contact you as soon as possible",
      end: true,
    },
  ];

  return (
    <>
      <Button
        onClick={toggleChatbotVisibility}
        className="mt-2 bg-cyan-500 text-white hover:bg-white hover:text-black px-4 py-2 rounded"
      >
        {isChatbotVisible ? "Hide Chatbot" : "Show Chatbot"}
        <FaRobot className="text-3xl ml-2" />
      </Button>
      {isChatbotVisible && (
        <Segment floated="right">
          <Chatbot steps={steps} />
        </Segment>
      )}
    </>
  );
};

export default ChatbotApp;
