import React from "react";
import { Sentiment } from "../../../../App";
import { Alert, AlertTitle } from "@mui/material";

type Props = {
  mood: Sentiment;
  tip: string;
};

const MoodAlert: React.FC<Props> = ({ mood, tip }) => {
  return (
    <>
      {mood === "POSITIVE" ? (
        <Alert severity="success">
          <AlertTitle>BobBot liked that comment!</AlertTitle>
          {tip}
        </Alert>
      ) : mood === "NEGATIVE" ? (
        <Alert severity="error">
          <AlertTitle>This upset Bobbot!</AlertTitle>
          {tip}
        </Alert>
      ) : mood === "NEUTRAL" ? (
        <Alert severity="info">
          <AlertTitle>Bobbot is neutral about this.</AlertTitle>
          {tip}
        </Alert>
      ) : mood === "MIXED" ? (
        <Alert severity="warning">
          <AlertTitle>Bobbot has mixed feelings on this.</AlertTitle>
          {tip}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default MoodAlert;
