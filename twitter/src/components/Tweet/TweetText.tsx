import { Typography, withStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTypography = withStyles({
  body1: {
    wordBreak: "break-word",
  },
})(Typography);

const HashTag = styled(Link)`
  color: #1da1f2;

  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

interface Props {
  text?: string;
}

export const TweetText = ({ text = "" }: Props) => {
  return (
    <StyledTypography variant="body1">
      {text.split(" ").map((word, i) => {
        if (word.includes("#")) {
          return (
            <React.Fragment key={word + i * i}>
              <HashTag to={`/${word}`}>{word}</HashTag>{" "}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={word + i * i}>
            <span>{word}</span>{" "}
          </React.Fragment>
        );
      })}
    </StyledTypography>
  );
};
