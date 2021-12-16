import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { Route, useHistory } from "react-router-dom";
import { BackButton } from "./BackButton";
import styled from "styled-components";

const HeaderWrapper = styled(Paper)`
display: flex;
    align-items: center;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    position: sticky;
    top: 0;
    z-index: 99;
    padding: 10px 0 10px 15px;
    & h6 {
      font-weight: 800,
    },
`;

export const MiddleHeader = () => {
  const history = useHistory();
  return (
    <>
      <HeaderWrapper variant="outlined" square>
        {history.location.pathname !== "/home" && (
          <Route path="/:any">
            <BackButton />
          </Route>
        )}

        <Route path={["/home", "/home/search"]} exact>
          <Typography variant="h6">Главная</Typography>
        </Route>
        <Route path="/tweets/:id" exact>
          <Typography variant="h6">Твит</Typography>
        </Route>
        <Route path="/profile/:login" exact>
          <Typography variant="h6">Профиль</Typography>
        </Route>
      </HeaderWrapper>
      {/* <Route path={["/home", "/home/search"]} exact>
        <Paper
          style={{
            backgroundColor: "rgb(247,249,250)",
            height: 10,
            borderLeft: 0,
            borderRight: 0,
          }}
          variant="outlined"
          square
        />
      </Route> */}
    </>
  );
};
