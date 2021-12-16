import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import { MiddleContent } from "../../components/MiddleContent";
import { MiddleHeader } from "../../components/MiddleHeader";
import { RecommendedUsers } from "../../components/Recommendations/RecommendedUsers/RecommendedUsers";
import { Topics } from "../../components/Recommendations/Topics/Topics";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { TweetForm } from "../../components/TweetForm";
import { useHomePageClasses } from "./theme/theme";

const SearchTextField = withStyles((theme: Theme) => ({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: 30,
      backgroundColor: "rgb(235,238,240)",
      padding: 0,
      paddingLeft: 15,

      "&.Mui-focused": {
        backgroundColor: "#fff",
        "& fieldset": {
          borderWidth: 1,
          borderColor: theme.palette.primary.main,
        },
        "& svg path": {
          fill: theme.palette.primary.main,
        },
      },
      "&:hover": {
        "& fieldset": {
          borderColor: "transparent",
        },
      },
      "& fieldset": {
        borderWidth: 1,
        borderColor: "transparent",
      },
    },

    "& .MuiInputBase-input": {
      padding: "12px 14px 14px 5px",
    },
  },
}))(TextField);

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
            <SearchTextField
              variant="outlined"
              placeholder="Поиск в Твиттере"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <Topics />
            <RecommendedUsers />
          </RecommendationWrapper>
        </Grid>
      </Grid>
    </HomeWrapper>
  );
};
