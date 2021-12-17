import { Button, Typography, withStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const EmptyTweetsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 40px 20px;
`;

const StyledTypography = withStyles({
  root: {},
  h3: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 700,
  },
  body2: {
    fontSize: 15,
  },
})(Typography);

const GoButton = styled(Button)`
  display: inline-block;
  margin-top: 20px;
`;

export const EmptyTweets = () => {
  return (
    <EmptyTweetsWrapper>
      <StyledTypography variant="h3">
        Добро пожаловать в Твиттер!
      </StyledTypography>
      <StyledTypography variant="body2" color="textSecondary">
        Лучший источник новостей о том, что происходит в мире. Начните читать
        интересных людей и выберите актуальные для вас темы.
      </StyledTypography>
      <GoButton color="primary" variant="contained">
        Поехали!
      </GoButton>
    </EmptyTweetsWrapper>
  );
};
