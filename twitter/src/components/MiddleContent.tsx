import React from "react";
import { Route } from "react-router-dom";
import { Profile } from "../pages/Profile/Profile";
import { FeedTweetsContainer } from "./Tweet/FeedTweetsContainer";

import { TweetsList } from "./TweetsList";

export const MiddleContent = () => {
  return (
    <>
      <Route path="/home" exact>
        <FeedTweetsContainer />
      </Route>
      <Route path="/profile/:id" exact>
        <Profile />
      </Route>
      <Route path="/tweets/:id" exact>
        {/* <FullTweet /> */}
      </Route>
    </>
  );
};
