import React from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useHomePageClasses } from "../pages/Home/theme/theme";
import { selectTopicsItems } from "../store/ducks/topics/selectors";

interface TopicsInterface {
  classes: ReturnType<typeof useHomePageClasses>;
}

export const Topics: React.FC<TopicsInterface> = ({
  classes,
}: TopicsInterface) => {
  const topics = useSelector(selectTopicsItems);

  return (
    <Paper className={classes.rightSideList} variant="outlined" square>
      <Paper className={classes.rightSideListTitle}>
        <Typography variant="h6">Актуальные темы</Typography>
      </Paper>
      <Divider />
      <List className={classes.rightSideThemesList}>
        {topics.map((topic) => (
          <React.Fragment key={topic._id}>
            <ListItem
              className={classnames(
                classes.rightSideThemesListItem,
                classes.rightSideListItem
              )}
            >
              <Link to={`/home/search?q=${topic._id}`}>
                <ListItemText
                  primary={topic.title}
                  secondary={<Typography>Твитов: {topic.count}</Typography>}
                />
              </Link>
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}
        <ListItem
          className={classnames(
            classes.rightSideThemesListItem,
            classes.rightSideListItem
          )}
        >
          <ListItemText primary="Показать еще" />
        </ListItem>
      </List>
    </Paper>
  );
};
