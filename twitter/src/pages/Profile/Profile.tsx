import { Button, Paper, Typography, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { format } from "date-fns";
import ruLang from "date-fns/locale/ru";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Loader } from "../../components/Loader";
import { useGetCurrentUser } from "../../hooks/useGetCUrrentUser";
import { useModal } from "../../hooks/useModal";
import { selectCurrentUserData } from "../../store/currentUser/selectors";
import { LikedList } from "./LikedList";
import { PersonalList } from "./PersonalList";
import { ProfileAvatar } from "./ProfileAvatar";
import { SetupProfileModal } from "./SetupProfile/SetupProfileModal";

const StyledTypography = withStyles({
  root: {
    fontWeight: 400,
    fontSize: 15,
  },
  h6: {
    fontWeight: 700,
    fontSize: 20,
  },
  body2: {},
})(Typography);

const StyledCalendarIcon = styled(CalendarTodayIcon)`
  width: 18px;
  margin-right: 3px;
`;

const SubDescriptionInfo = styled(StyledTypography)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 12px;
`;

const SubCount = styled.b`
  color: #000;
`;

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
  const { id } = useParams<{ id: string }>();
  const { currentUserData, isLoading } = useGetCurrentUser(id);
  const myData = useSelector(selectCurrentUserData);
  const { isOpen, onOpen, onClose } = useModal();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (currentUserData) {
    return (
      <>
        {Boolean(currentUserData.backgroundImage) ? (
          <img
            src={currentUserData.backgroundImage}
            style={{ width: "100%", height: 200, objectFit: "cover" }}
            alt="background"
          />
        ) : (
          <Paper
            style={{ backgroundColor: "#CFD9DE", height: 200 }}
            square
          ></Paper>
        )}

        <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ProfileAvatar src={currentUserData?.avatar} />
            {myData?.userId === currentUserData.userId && (
              <Button
                color="primary"
                variant="outlined"
                onClick={() => onOpen()}
              >
                Настроить профиль
              </Button>
            )}
          </div>
          <div>
            <StyledTypography variant="h6">
              {currentUserData?.name}
            </StyledTypography>
            <StyledTypography variant="body2" color="textSecondary">
              @{currentUserData?.login}
            </StyledTypography>
            <SubDescriptionInfo color="textSecondary">
              {currentUserData?.location && (
                <Box display="flex" alignItems="center" mr={1} ml={-0.35}>
                  <LocationOnIcon />
                  <span>{currentUserData?.location}</span>
                </Box>
              )}

              <Box display="flex" alignItems="center" mr={1}>
                <StyledCalendarIcon />
                <span>
                  Регистрация:{" "}
                  {currentUserData?.createdAt &&
                    format(new Date(currentUserData?.createdAt), "LLLL y", {
                      locale: ruLang,
                    })}
                </span>
              </Box>
            </SubDescriptionInfo>
            <SubDescriptionInfo color="textSecondary">
              <Box mr={1}>
                <StyledTypography>
                  <SubCount>{currentUserData?.subscriptionsCount}</SubCount> в
                  читаемых
                </StyledTypography>
              </Box>
              <StyledTypography>
                <SubCount>{currentUserData?.subscribersCount}</SubCount>{" "}
                читателей
              </StyledTypography>
            </SubDescriptionInfo>
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
          <PersonalList userId={currentUserData.userId} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LikedList userId={currentUserData.userId} />
        </TabPanel>
        <SetupProfileModal open={isOpen} onClose={onClose} />
      </>
    );
  }

  return null;
};
