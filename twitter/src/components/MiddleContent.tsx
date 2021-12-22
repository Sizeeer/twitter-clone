import React from "react";
import { Route, Switch } from "react-router-dom";

import { Profile } from "../pages/Profile/Profile";
import { Search } from "../pages/Search/Search";
import { FullTweet } from "./FullTweet";
import { Messages } from "./Messages/Messages";
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
      <Route path="/search" exact>
        <Search />
      </Route>
      <Route path="/tweets/:id" exact>
        <FullTweet />
      </Route>
    </Switch>
  );
};
