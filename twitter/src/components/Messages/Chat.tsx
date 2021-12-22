import { Box, Button, Paper, Typography, withStyles } from "@material-ui/core";
import { format } from "date-fns";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { socket } from "../../App";
import { Event } from "../../chatEvents";
import { MessageAttributes } from "../../shared/types/chatTypes";
import { UserAttributes } from "../../shared/types/userTypes";
import { selectCurrentUserData } from "../../store/currentUser/selectors";
import { formatDate } from "../../utils/formatDate";
import { Loader } from "../Loader";
import Scrollbar from "../Scrollbar";
import { UserInfoFull } from "../UserInfoFull";
import { useGetMessages } from "./hooks/useGetMessages";
import { MessageForm } from "./MessageForm";

const HeaderWrapper = styled(Paper)`
display: flex;
    align-items: center;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    position: sticky;
    top: 0;
    z-index: 99;
    padding: 12px 0 12px 15px;
    & h6 {
      font-weight: 800,
    },
`;

interface MessageProps {
  even: boolean;
}

const Message = styled.div<MessageProps>`
  padding: 1rem;
  margin: 15px 0px 5px 0px;
  background-color: #1d9bf0;
  color: #fff;
  border-radius: 10px;
  margin-left: ${(props) => (props.even ? "60%" : "0")};
  margin-right: ${(props) => (!props.even ? "60%" : "0")};
`;

const MessagesWrapper = styled.div`
  overflow: hidden;
  padding: 45px 45px 85px 45px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const StyledTypography = withStyles({
  subtitle2: {
    fontSize: 13,
    fontWeight: 400,
    color: "#536471",
  },
})(Typography);

interface Props {
  readonly user: UserAttributes | undefined;
}

export const Chat = ({ user }: Props) => {
  const [messagesState, setMessagesState] = useState<MessageAttributes[]>([]);

  const { messages, isLoading, hasMessages, getMoreMessages } = useGetMessages(
    user!.userId
  );

  const currentUserData = useSelector(selectCurrentUserData);

  const bottomRef = useRef<null | HTMLDivElement>(null);

  const handleScroll = useCallback(
    (e) => {
      if (e.scrollTop === 0 && hasMessages) {
        getMoreMessages();
      }
    },
    [hasMessages, getMoreMessages]
  );

  const onSubmitFormMessage = (text: string) => {
    socket.emit(Event.ADD_MESSAGE_FROM_CLIENT, {
      userId: currentUserData?.userId,
      text,
    });
  };

  useEffect(() => {
    setMessagesState((prev) => [...messages]);
  }, [JSON.stringify(messages)]);

  useEffect(() => {
    socket.on(
      Event.ADD_MESSAGE_FROM_SERVER,
      ({ message }: { message: MessageAttributes }) => {
        setMessagesState((prev) => [...prev, message]);
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    );
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomRef.current]);

  return (
    <Box position="relative" height="100%" pb={8}>
      <HeaderWrapper variant="outlined" square>
        <UserInfoFull currentUser={user} />
      </HeaderWrapper>
      <MessagesWrapper>
        <Scrollbar noScrollX onScroll={handleScroll}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {messagesState.length !== 0 &&
                messagesState.map((message, i) => {
                  return (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      pt={1}
                      pb={1}
                      pr={1}
                    >
                      <Message
                        key={i}
                        even={currentUserData?.userId === message?.sender_id}
                      >
                        {message?.text}
                      </Message>

                      <StyledTypography variant="subtitle2">
                        {format(
                          new Date(message?.createdAt || Date.now()),
                          "MMM d, yyyy, h:m aa"
                        )}
                      </StyledTypography>
                    </Box>
                  );
                })}

              <div ref={bottomRef} />
            </>
          )}
        </Scrollbar>
      </MessagesWrapper>
      <MessageForm onSubmitProps={onSubmitFormMessage} />
    </Box>
  );
};
