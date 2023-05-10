import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Character from "./components/Character/Character";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { OpenAIResponse, chatToBob } from "./components/Chat/ChatAction";
import { useMutation } from "react-query";

export type Sentiment = "POSITIVE" | "NEGATIVE" | "NEUTRAL" | "MIXED";

function App() {
  const textInput = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<OpenAIResponse | null>>(
    []
  );
  const [mood, setMood] = useState<Sentiment>("NEGATIVE");
  const [tip, setTip] = useState<string>("");

  const userMessageAdded = useRef(false);

  return (
    <>
      <Container>
        <h1>BobBot is Sad 😢 Cheer him up!</h1>
        <Grid container spacing={2} columns={12}>
          <Grid xl={6}>
            {/* Drilling the props :( Will update this later probably (not) */}
            <Chat
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              value={value}
              setValue={setValue}
              textInput={textInput}
              userMessageAdded={userMessageAdded}
              setMood={setMood}
              setTip={setTip}
            />
          </Grid>

          <Grid xl={6}>
            <Character mood={mood} tip={tip} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
