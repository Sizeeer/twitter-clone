import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import { InProgress } from "./core/InProgress";
import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";
import { useSignInStyles } from "./pages/SignIn/theme";
import { fetchUserDataAction } from "./store/ducks/user/actionCreators";
import { USER_LOADING_STATE } from "./store/ducks/user/contracts/reducer";
import {
  selectIsAuth,
  selectUserLoadingState,
} from "./store/ducks/user/selectors";

export const FuncInProgressContext = React.createContext((event: any) => {});

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useSignInStyles();

  const isAuth = useSelector(selectIsAuth);
  const userStatus = useSelector(selectUserLoadingState);

  const isReady =
    userStatus !== USER_LOADING_STATE.NEVER &&
    userStatus !== USER_LOADING_STATE.LOADING;

  const [isOpenInProgressWindow, setIsOpenInProgressWindow] =
    React.useState(false);

  const openProgressWindow = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpenInProgressWindow(true);
  };

  const closeOpenInProgressWindow = () => {
    setIsOpenInProgressWindow(false);
  };

  React.useEffect(() => {
    dispatch(fetchUserDataAction());
  }, [dispatch]);

  React.useEffect(() => {
    if (isAuth && isReady) {
      history.push("/home");
    } else {
      history.push("/signin");
    }
  }, [isAuth, isReady, history]);

  if (!isReady) {
    return (
      <div className={classes.centeredItem}>
        <TwitterIcon color="primary" style={{ width: 60, height: 60 }} />
      </div>
    );
  }

  return (
    <>
      <FuncInProgressContext.Provider value={openProgressWindow}>
        <div className="App">
          <Switch>
            <Route path="/signin" component={SignIn} exact />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </FuncInProgressContext.Provider>
      <InProgress
        isOpen={isOpenInProgressWindow}
        onClose={closeOpenInProgressWindow}
      />
    </>
  );
}

export default App;
