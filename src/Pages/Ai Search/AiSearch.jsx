import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.css"; ////////////////////////////////
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

const AiSearch = () => {
  // ==========
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am  samGpt!",
      sender: "ChatGpt",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessages]; //all new messages +old messages

    // update our message state
    setMessages(newMessage);
    // process the message to chatgpt
  };
  // =========
  return (
    <div>
      <h1 className="text-white mb-16">helloo</h1>
      <SectionTitle
        heading={"Our Modern Search"}
        subHeading={"Gather Knowledge Whatever you want"}
      ></SectionTitle>

      {/* ========== */}
      <div>
        <div style={{ position: "relative", height: "400px", width: "700px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((message, i) => {
                  return <Message key={i} model={message}></Message>;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
      {/* = =========== */}
    </div>
  );
};

export default AiSearch;
