import { Collapse } from "@mui/material";
import React from "react";
import { Sentiment } from "../../../App";
import "./AlertWindow.css";
import MoodAlert from "./MoodAlert/MoodAlert";

type Props = {
  mood: Sentiment;
  tip: string;
};

const AlertWindow: React.FC<Props> = ({ mood, tip }) => {
  return (
    <div className="alert-container">
      <Collapse in={tip !== ""}>
        <MoodAlert mood={mood} tip={tip} />
      </Collapse>
    </div>
  );
};

export default AlertWindow;
