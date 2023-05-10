import React, { Ref } from "react";
import "./Chat.css";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "react-query";
import { OpenAIResponse, chatToBob } from "./ChatAction";
import Message from "./Message/Message";
import SendIcon from "@mui/icons-material/Send";
import { Sentiment } from "../../App";
import useChatScroll from "./useChatScroll";

// types for Props
interface Props {
  chatHistory: Array<OpenAIResponse | null>;
  setChatHistory: (chatHistory: Array<OpenAIResponse | null>) => void;
  value: string;
  setValue: (value: string) => void;
  textInput: Ref<HTMLInputElement>;
  userMessageAdded: Ref<boolean>;
  setMood: (mood: Sentiment) => void;
  setTip: (value: string) => void;
}

const Chat: React.FC<Props> = ({
  chatHistory,
  setChatHistory,
  value,
  setValue,
  textInput,
  userMessageAdded,
  setMood,
  setTip,
}) => {
  // const textInput = React.useRef<HTMLInputElement>(null);
  const ref = useChatScroll(chatHistory.length);
  // const userMessageAdded = React.useRef(false);
  const mutation = useMutation({
    mutationFn: (chatHistory: Array<OpenAIResponse | null>) => {
      return chatToBob(chatHistory);
    },
    onSuccess: (data) => {
      setChatHistory([...chatHistory, data["message"]]);
      setMood(data["sentiment"] as Sentiment);
      setTip(data["tip"] as string);
      textInput.current?.focus();
    },
  });

  React.useEffect(() => {
    if (userMessageAdded.current) {
      mutation.mutate(chatHistory);
      userMessageAdded.current = false;
    }
  }, [chatHistory]);

  return (
    <>
      <div className="chat-container">
        <div className="blur"></div>
        <div className="chat-box" ref={ref}>
          {chatHistory.map((chat: OpenAIResponse | null, index: number) => (
            <Message chat={chat} key={index} />
          ))}
        </div>
      </div>
      <div className="input-container">
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            if (value === "") return;
            setMood("MIXED");
            setChatHistory([...chatHistory, { role: "user", content: value }]);
            userMessageAdded.current = true;
            setValue("");
            setTip("");
          }}
        >
          <div className="input-wrapper">
            <TextField
              variant="filled"
              inputRef={textInput}
              label="Chat with Bob"
              value={value}
              disabled={mutation.isLoading}
              style={{
                flexGrow: 1,
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
            <LoadingButton
              variant="contained"
              endIcon={<SendIcon />}
              size="large"
              type="submit"
              loading={mutation.isLoading}
            >
              Send
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
