import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { Profile } from "../pages/Profile/Profile";
import { selectCurrentUserData } from "../store/currentUser/selectors";
import { FeedTweetsContainer } from "./Tweet/FeedTweetsContainer";

export const MiddleContent = () => {
  return (
    <Switch>
      <Route path="/home" exact>
        <FeedTweetsContainer />
      </Route>
      <Route path="/profile/:id" exact>
        <Profile />
      </Route>
      <Route path="/tweets/:id" exact>
        {/* <FullTweet /> */}
      </Route>
    </Switch>
  );
};
