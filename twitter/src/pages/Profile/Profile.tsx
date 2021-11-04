import {
  Avatar,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { USER_LOADING_STATE } from "../../store/ducks/user/contracts/reducer";
import {
  selectUserData,
  selectUserLoadingState,
} from "../../store/ducks/user/selectors";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useHomePageClasses } from "../Home/theme/theme";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  selectLoadingState,
  selectMyTweetsItems,
} from "../../store/ducks/tweets/selectors";
import { Tweet } from "../../core/Tweet";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Box from "@material-ui/core/Box";
import { format } from "date-fns";
import ruLang from "date-fns/locale/ru";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const Profile: React.FC = () => {
  const userData = useSelector(selectUserData);
  const tweets = useSelector(selectMyTweetsItems);
  const isLoading = useSelector(selectUserLoadingState);
  const isTweetsLoading = useSelector(selectLoadingState);
  console.log(tweets);

  const classes = useHomePageClasses();

  const [value, setValue] = React.useState<number>(0);

  if (isLoading === USER_LOADING_STATE.LOADING) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (userData && tweets) {
    return (
      <>
        <Paper
          style={{ backgroundColor: "#CFD9DE", height: 200 }}
          square
        ></Paper>
        <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Avatar
              style={{
                width: 130,
                height: 130,
                marginTop: -77,
                border: "4px solid #fff",
              }}
              src={userData.avatar}
            />
            <Button color="primary" variant="outlined">
              Настроить профиль
            </Button>
          </div>
          <div>
            <Typography variant="h6" style={{ fontWeight: 700, fontSize: 20 }}>
              {userData.fullname}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ fontSize: 15 }}
            >
              @{userData.username}
            </Typography>
            <Typography
              color="textSecondary"
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 15,
                marginTop: 12,
              }}
            >
              {userData.location && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <LocationOnIcon />
                  <span>{userData.location}</span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <CalendarTodayIcon style={{ marginRight: 3, width: 18 }} />
                <span>
                  Регистрация:{" "}
                  {format(new Date(userData.createdAt), "LLLL y", {
                    locale: ruLang,
                  })}
                </span>
              </div>
            </Typography>
            <div style={{ display: "flex", marginTop: 12 }}>
              <Typography
                color="textSecondary"
                style={{ marginRight: 10, fontSize: 15 }}
              >
                <b style={{ color: "#000" }}>{userData.readable.length}</b> в
                читаемых
              </Typography>
              <Typography color="textSecondary" style={{ fontSize: 15 }}>
                <b style={{ color: "#000" }}>{userData.readers.length}</b>{" "}
                читателей
              </Typography>
            </div>
          </div>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Твиты и ретвиты" />
            <Tab label="Нравится" />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          {isTweetsLoading ? (
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
                Лучший источник новостей о том, что происходит в мире. Начните
                читать интересных людей и выберите актуальные для вас темы.
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item one
        </TabPanel>
      </>
    );
  }

  return null;
};
