import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { MiddleWrapper } from "../../pages/Home/Home";
import { UserAttributes } from "../../shared/types/userTypes";
import { MiddleHeader } from "../MiddleHeader";

import { Chat } from "./Chat";
import { Chats } from "./Chats";
import { NotSelectedChat } from "./NotSelectedChat";

export const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<UserAttributes>();

  return (
    <>
      <Grid item xs={4}>
        <MiddleWrapper variant="outlined" square>
          <MiddleHeader />
          <Chats setSelectedChat={setSelectedChat} />
        </MiddleWrapper>
      </Grid>

      <Grid item xs={5}>
        {Boolean(selectedChat) ? (
          <Chat user={selectedChat} />
        ) : (
          <NotSelectedChat />
        )}
      </Grid>
    </>
  );
};
