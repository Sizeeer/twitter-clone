import React, { memo } from "react";
import { Route, Switch } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";

export const Routes = memo(() => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Switch>
      <Route path="*" component={Home} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/signin" component={SignIn} exact />
    </Switch>
  );
});
