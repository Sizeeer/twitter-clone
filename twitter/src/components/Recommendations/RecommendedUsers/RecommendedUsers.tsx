import { Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useSubscribe } from "../../../hooks/useSubscribe";
import { UserAttributes } from "../../../shared/types/userTypes";
import { Loader } from "../../Loader";
import { UserInfoFull } from "../../UserInfoFull";
import { BlockWrapper } from "../core/BlockWrapper";
import { List } from "../core/List";
import { ListItem, OpenAll } from "../core/ListItem";
import { ListTitle } from "../core/ListTitle";
import { useGetRecommendedUsers } from "./hooks/useGetRecommendedUsers";

interface ListItemProps {
  user: UserAttributes;
  onSubscribe: (userId: string) => void;
  onUnsubscribe: (userId: string) => void;
  isError: boolean;
}

const RecommendationListItem = ({
  user,
  onSubscribe,
  onUnsubscribe,
  isError,
}: ListItemProps) => {
  const [isSubscription, setIsSubscription] = useState(false);

  const onToggleSubscribe = useCallback(
    (userId: string) => {
      if (isSubscription) {
        onUnsubscribe(userId);
        setIsSubscription(false);
      } else {
        onSubscribe(userId);
        setIsSubscription(true);
      }
    },
    [isSubscription, onUnsubscribe, onSubscribe]
  );

  useEffect(() => {
    if (isError) {
      setIsSubscription((prev) => !prev);
    }
  }, [isError]);
  return (
    <>
      {/* @ts-ignore */}
      <ListItem>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <UserInfoFull currentUser={user} />
          <IconButton
            color="primary"
            onClick={() => {
              onToggleSubscribe(user!.userId);
            }}
          >
            {isSubscription ? <CheckCircleOutlineIcon /> : <PersonAddIcon />}
          </IconButton>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export const RecommendedUsers = () => {
  const { recommendedUsers, isLoading: isGetUsersLoading } =
    useGetRecommendedUsers(5);

  const { subscribe, unsubscribe, isError } = useSubscribe();

  const onSubscribeHandler = useCallback(
    (userId: string) => {
      subscribe(userId);
    },
    [subscribe]
  );

  const onUnsubscribeHandler = useCallback(
    (userId: string) => {
      unsubscribe(userId);
    },
    [unsubscribe]
  );

  return (
    <BlockWrapper variant="outlined" square>
      {isGetUsersLoading ? (
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
                <RecommendationListItem
                  key={user.userId}
                  user={user}
                  onSubscribe={onSubscribeHandler}
                  onUnsubscribe={onUnsubscribeHandler}
                  isError={isError}
                />
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
