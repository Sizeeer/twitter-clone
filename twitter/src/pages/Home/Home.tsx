import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Tweet } from "../../core/Tweet";
import { SideMenu } from "../../core/SideMenu";
import { TweetForm } from "../../core/TweetForm";
import { Topics } from "../../core/Topics";
import { RecommendedUsers } from "../../core/Recommended";
import { BackButton } from "../../core/BackButton";
import { useHomePageClasses } from "./theme/theme";
import {
  selectLoadingState,
  selectTweetsItems,
} from "../../store/ducks/tweets/selectors";
import { fetchTweetsAction } from "../../store/ducks/tweets/actionCreators";
import { fetchTopicsAction } from "../../store/ducks/topics/contracts/actionCreators";
import { FullTweet } from "../../core/FullTweet";
import { Button } from "@material-ui/core";
import { Profile } from "../Profile/Profile";

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

export const Home: React.FC = () => {
  const classes = useHomePageClasses();
  const history = useHistory();
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweetsItems);
  const isLoading = useSelector(selectLoadingState);

  React.useEffect(() => {
    dispatch(fetchTweetsAction());
    dispatch(fetchTopicsAction());
  }, [dispatch]);

  return (
    <Container className={classes.navSideWrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3} style={{ paddingBottom: 0 }}>
          <SideMenu classes={classes} />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.tweetsWrapper} variant="outlined" square>
            <Paper className={classes.tweetsHeader} variant="outlined" square>
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
            </Paper>
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

            <Route path="/home" exact>
              {isLoading ? (
                <div className={classes.loaderWrapper}>
                  <CircularProgress color="primary" />
                </div>
              ) : tweets.length <= 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    padding: "40px 20px",
                  }}
                >
                  <Typography
                    variant="h3"
                    style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}
                  >
                    Добро пожаловать в Твиттер!
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ fontSize: 15 }}
                  >
                    Лучший источник новостей о том, что происходит в мире.
                    Начните читать интересных людей и выберите актуальные для
                    вас темы.
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ display: "inline-block", marginTop: 20 }}
                  >
                    Поехали!
                  </Button>
                </div>
              ) : (
                tweets.map((tweet) => (
                  <Tweet key={tweet._id} classes={classes} {...tweet} />
                ))
              )}
            </Route>

            <Route path="/tweets/:id" exact>
              <FullTweet />
            </Route>

            <Route path="/profile/:login" exact>
              <Profile />
            </Route>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <div
            style={{
              backgroundColor: "#fff",
              zIndex: 99,
              position: "sticky",
              top: 3,
            }}
          >
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

            <Topics classes={classes} />
            <RecommendedUsers classes={classes} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
