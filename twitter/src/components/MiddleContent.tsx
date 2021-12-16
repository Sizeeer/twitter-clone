import React from "react";
import { Route } from "react-router-dom";

import { TweetsList } from "./TweetsList";

export const MiddleContent = () => {
  return (
    <>
      <Route path="/home" exact>
        <TweetsList />
      </Route>

      <Route path="/tweets/:id" exact>
        {/* <FullTweet /> */}
      </Route>

      {/* <Route path="/profile/:login" exact>
            <Profile />
          </Route> */}
    </>
  );
};
