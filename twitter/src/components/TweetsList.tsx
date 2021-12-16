import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { useOnScreen } from "../hooks/useOnScreen";
import { TweetAttributes } from "../shared/types/tweetTypes";
import { Loader } from "./Loader";
import { useGetTweets } from "./Tweet/hooks/useGetTweets";
import { Tweet } from "./Tweet/Tweet";

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
export const TweetsList = () => {
  const { data, getMoreTweets, hasTweets, isLoading } = useGetTweets();

  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  useEffect(() => {
    if (isOnScreen && hasTweets) {
      getMoreTweets();
    }
  }, [isOnScreen, getMoreTweets, hasTweets]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data?.pages.length === 0 ? (
        <EmptyTweetsWrapper>
          <StyledTypography variant="h3">
            Добро пожаловать в Твиттер!
          </StyledTypography>
          <StyledTypography variant="body2" color="textSecondary">
            Лучший источник новостей о том, что происходит в мире. Начните
            читать интересных людей и выберите актуальные для вас темы.
          </StyledTypography>
          <GoButton color="primary" variant="contained">
            Поехали!
          </GoButton>
        </EmptyTweetsWrapper>
      ) : (
        <>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group?.subscriptions?.tweets?.map((tweet: TweetAttributes) => (
                <Tweet key={tweet.tweetId} {...tweet} />
              ))}
            </React.Fragment>
          ))}
        </>
      )}
      <div ref={ref} />
    </>
  );
};
