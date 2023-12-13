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

const API_KEY = "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";
const AiSearch = () => {
  const [typing, setTyping] = useState(false);
  // ==========
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am  samGpt!",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; //all new messages +old messages

    // update our message state
    setMessages(newMessages);

    // typing indicator (samGPT is typing)
    setTyping(true);
    // process the message to chatgpt
    await processMessageToChatgpt(newMessages);
  };
  async function processMessageToChatgpt(chatMessages) {
    // =============
    // =============================
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 10 years old.",
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
  // =========
  return (
    <div>
      <h1 className="text-white mb-16">helloo</h1>
      <SectionTitle
        heading={"Our Modern Search"}
        subHeading={"Gather Knowledge Whatever you want"}
      ></SectionTitle>

      {/* ========== */}
      <div className="App">
        <div style={{ position: "relative", height: "400px", width: "700px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  typing ? (
                    <>
                      <TypingIndicator content="SamGPT is Typing" />{" "}
                    </>
                  ) : null
                }
              >
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
