import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import { MiddleContent } from "../../components/MiddleContent";
import { MiddleHeader } from "../../components/MiddleHeader";
import { RecommendedUsers } from "../../components/Recommendations/RecommendedUsers/RecommendedUsers";
import { Topics } from "../../components/Recommendations/Topics/Topics";
import { SearchBar } from "../../components/SearchBar";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { TweetForm } from "../../components/TweetForm/TweetForm";
import { useHomePageClasses } from "./theme/theme";

const HomeWrapper = styled(Container)`
  height: 100vh;
`;

const SideMenuWrapper = styled(Grid)`
  padding-bottom: 0px;
`;

const MiddleWrapper = styled(Paper)`
  height: 100%;
  flex-grow: 1;
  border-top: 0px;
`;

const RecommendationWrapper = styled.div`
  background-color: #fff;
  z-index: 99;
  position: sticky;
  top: 3px;
  padding-left: 20px;
`;

export const Home = () => {
  const classes = useHomePageClasses();

  return (
    <HomeWrapper maxWidth="lg">
      <Grid container>
        <SideMenuWrapper item xs={3}>
          <SideMenu classes={classes} />
        </SideMenuWrapper>
        <Grid item xs={6}>
          <MiddleWrapper variant="outlined" square>
            <MiddleHeader />
            <Route path={["/home", "/home/search"]} exact>
              <div style={{ padding: "10px 15px" }}>
                <TweetForm classes={classes} maxRows={15} rowsMin={2} />
              </div>
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
            </Route>
            <MiddleContent />
          </MiddleWrapper>
        </Grid>
        <Grid item xs={3}>
          <RecommendationWrapper>
            <SearchBar />
            <Topics />
            <RecommendedUsers />
          </RecommendationWrapper>
        </Grid>
      </Grid>
    </HomeWrapper>
  );
};
