import { Button, Paper, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { format } from "date-fns";
import ruLang from "date-fns/locale/ru";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUserData } from "../../store/currentUser/selectors";
import { LikedList } from "./LikedList";
import { PersonalList } from "./PersonalList";
import { ProfileAvatar } from "./ProfileAvatar";

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
  const currentUserData = useSelector(selectCurrentUserData);

  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (currentUserData) {
    return (
      <>
        <Paper
          style={{ backgroundColor: "#CFD9DE", height: 200 }}
          square
        ></Paper>
        <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ProfileAvatar />
            <Button color="primary" variant="outlined">
              Настроить профиль
            </Button>
          </div>
          <div>
            <Typography variant="h6" style={{ fontWeight: 700, fontSize: 20 }}>
              {currentUserData.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ fontSize: 15 }}
            >
              @{currentUserData.login}
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
              {currentUserData.location && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <LocationOnIcon />
                  <span>{currentUserData.location}</span>
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
                  {currentUserData?.createdAt &&
                    format(new Date(currentUserData?.createdAt), "LLLL y", {
                      locale: ruLang,
                    })}
                </span>
              </div>
            </Typography>
            <div style={{ display: "flex", marginTop: 12 }}>
              {/* <Typography
                color="textSecondary"
                style={{ marginRight: 10, fontSize: 15 }}
              >
                <b style={{ color: "#000" }}>
                  {currentUserData.readable.length}
                </b>{" "}
                в читаемых
              </Typography>
              <Typography color="textSecondary" style={{ fontSize: 15 }}>
                <b style={{ color: "#000" }}>
                  {currentUserData.readers.length}
                </b>{" "}
                читателей
              </Typography> */}
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
          <PersonalList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LikedList />
        </TabPanel>
      </>
    );
  }

  return null;
};
