import { Box, withStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import React from "react";
import styled from "styled-components";

import { Loader } from "../../Loader";
import { UserAvatar } from "../../Tweet/Tweet";
import { BlockWrapper } from "../core/BlockWrapper";
import { List } from "../core/List";
import { ListItem, OpenAll } from "../core/ListItem";
import { ListTitle } from "../core/ListTitle";
import { useGetRecommendedUsers } from "./hooks/useGetRecommendedUsers";

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTypography = withStyles({
  root: {
    color: "#000",
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 1.5,
  },
  subtitle1: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  subtitle2: {
    fontWeight: 400,
    color: grey[500],
  },
})(Typography);

export const RecommendedUsers = () => {
  const { recommendedUsers, isLoading } = useGetRecommendedUsers(5);

  return (
    <BlockWrapper variant="outlined" square>
      {isLoading ? (
        <Loader fontSize={26} />
      ) : (
        <>
          <ListTitle>
            <Typography variant="h6">Кого читать</Typography>
          </ListTitle>
          <Divider />
          <List>
            {recommendedUsers.map((user) => {
              return (
                <>
                  {/* @ts-ignore */}
                  <ListItem>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex">
                        <UserAvatar alt="user avatar" src={user.avatar} />
                        <UserInfoWrapper>
                          <StyledTypography variant="subtitle1">
                            {user?.name}
                          </StyledTypography>
                          &nbsp;
                          <StyledTypography variant="subtitle2">
                            @{user?.login}&nbsp;
                          </StyledTypography>
                          <StyledTypography variant="subtitle2">
                            ·&nbsp;
                          </StyledTypography>
                        </UserInfoWrapper>
                      </Box>
                      <Box>
                        <IconButton color="primary">
                          <PersonAddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
            {/* @ts-ignore */}
            <OpenAll>
              <ListItemText primary="Показать еще" />
            </OpenAll>
          </List>
        </>
      )}
    </BlockWrapper>
  );
};
