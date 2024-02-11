import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import Chatbot from "react-simple-chatbot";
import { Segment, Button } from "semantic-ui-react";

const ChatbotApp = () => {
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
        {
          value: "gadget_features",
          label: "Gadget Features",
          trigger: "gadget_features",
        },
        {
          value: "gadget_prices",
          label: "Gadget Prices",
          trigger: "gadget_prices",
        },
        {
          value: "Did not find any information",
          label: "Did not find any information",
          trigger: "Did not find any information",
        },
      ],
    },
    {
      id: "gadget_features",
      message:
        "Sure, let me share some information about the latest gadget features...",
      trigger: "gadget_features_list",
    },
    {
      id: "gadget_features_list",
      message: "1. Feature 1\n2. Feature 2\n3. Feature 3\n",
      end: true,
    },
    {
      id: "gadget_prices",
      message:
        "Sure, let me provide you with information about gadget prices...",
      trigger: "gadget_prices_list",
    },
    {
      id: "gadget_prices_list",
      message: "1. Gadget 1 - $500\n2. Gadget 2 - $5324\n3. Gadget 3 - $24\n",
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
