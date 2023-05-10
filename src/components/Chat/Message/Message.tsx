import React from "react";
import { OpenAIResponse } from "../ChatAction";
import "./Message.css";

type Props = {
  chat: OpenAIResponse | null;
};

const Message: React.FC<Props> = ({ chat }) => {
  if (chat === null) {
    return <div></div>;
  } else if (chat.role === "user") {
    return <div className="message user">{chat.content}</div>;
  } else {
    return <div className="message bob">{chat.content}</div>;
  }
};

export default Message;
