import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React from "react";
import styled from "styled-components";

import { Loader } from "../../Loader";
import { BlockWrapper } from "../core/BlockWrapper";
import { List } from "../core/List";
import { ListTitle } from "../core/ListTitle";
import { useGetTopics } from "./hooks/useGetTopics";
import { OpenAll, ListItem } from "../core/ListItem";

const ListItemTextTitle = styled.span`
  font-weight: 700;
`;

export const Topics = () => {
  const { topics, isLoading } = useGetTopics(5);

  return (
    <BlockWrapper variant="outlined" square>
      {isLoading ? (
        <Loader fontSize={26} />
      ) : (
        <>
          <ListTitle>
            <Typography variant="h6">Актуальные темы</Typography>
          </ListTitle>
          <Divider />
          <List>
            {topics.map((topic) => (
              <React.Fragment key={topic.topicId}>
                {/* @ts-ignore */}
                <ListItem>
                  {/* //FIXME заменить на урл страницы поиска */}
                  {/* <Link to={`/home/search?q=${topic.topicId}`}> */}
                  <ListItemText
                    primary={
                      <ListItemTextTitle>{topic.title}</ListItemTextTitle>
                    }
                    secondary={<Typography>Твитов: {topic.count}</Typography>}
                  />
                  {/* </Link> */}
                </ListItem>

                <Divider />
              </React.Fragment>
            ))}
            {/* @ts-ignore */}
            <OpenAll>
              {/* //FIXME заменить на урл страницы поиска */}
              {/* <Link to={``}> */}
              <ListItemText primary="Открыть все" />
              {/* </Link> */}
            </OpenAll>
          </List>
        </>
      )}
    </BlockWrapper>
  );
};
