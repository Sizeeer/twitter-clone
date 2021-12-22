import { Typography, withStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import { UserAttributes } from "../../shared/types/userTypes";
import { formatDate } from "../../utils/formatDate";
import { Loader } from "../Loader";
import { UserInfoFull } from "../UserInfoFull";
import { useGetChats } from "./hooks/useGetChats";

const UserChatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: rgb(245, 248, 250);
  }
`;

const StyledTypography = withStyles({
  body1: {
    color: "#536471",
    fontSize: 14,
  },
})(Typography);

interface UserChatProps {
  readonly user: UserAttributes;
  readonly lastMessageDate: string;
  readonly setSelectedChat: React.Dispatch<
    React.SetStateAction<UserAttributes | undefined>
  >;
}

const UserChat = ({
  user,
  lastMessageDate,
  setSelectedChat,
}: UserChatProps) => {
  return (
    <UserChatWrapper onClick={() => setSelectedChat(user)}>
      <UserInfoFull currentUser={user} />
      <StyledTypography variant="body1">{lastMessageDate}</StyledTypography>
    </UserChatWrapper>
  );
};

interface Props {
  readonly setSelectedChat: React.Dispatch<
    React.SetStateAction<UserAttributes | undefined>
  >;
}

export const Chats = ({ setSelectedChat }: Props) => {
  const { chatData, isLoading } = useGetChats();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {chatData.map((el) => {
        return (
          <UserChat
            key={el.user.userId}
            user={el.user}
            lastMessageDate={formatDate(new Date(el.lastMessageDate))}
            setSelectedChat={setSelectedChat}
          />
        );
      })}
    </>
  );
};
