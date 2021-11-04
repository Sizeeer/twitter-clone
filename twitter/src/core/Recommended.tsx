import React from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useHomePageClasses } from "../pages/Home/theme/theme";
import { selectRecommendationData } from "../store/ducks/recommendation/selectors";
import {
  fetchRecommendationAction,
  setRecommendationDataAction,
} from "../store/ducks/recommendation/actionCreators";

interface RecommendedUsersInterface {
  classes: ReturnType<typeof useHomePageClasses>;
}

export const RecommendedUsers: React.FC<RecommendedUsersInterface> = ({
  classes,
}: RecommendedUsersInterface) => {
  const dispatch = useDispatch();

  const recommendationData = useSelector(selectRecommendationData);

  React.useEffect(() => {
    dispatch(setRecommendationDataAction(recommendationData));
  }, [recommendationData, dispatch]);

  React.useEffect(() => {
    dispatch(fetchRecommendationAction());
  }, [dispatch]);

  return (
    <Paper className={classes.rightSideList} variant="outlined" square>
      <Paper className={classes.rightSideListTitle}>
        <Typography variant="h6">Кого читать</Typography>
      </Paper>
      <Divider />
      <List className={classes.rightSideThemesList}>
        {recommendationData &&
          recommendationData.map((el) => {
            return (
              <>
                <ListItem
                  className={classnames(
                    classes.rightSideListReadingItem,
                    classes.rightSideListItem
                  )}
                >
                  <Grid
                    container
                    className={classes.rightSideListReadingWrapper}
                  >
                    <Grid item className={classes.rightSideListReadingInfo}>
                      <Avatar
                        className={classes.tweetAvatar}
                        alt="User Avatar"
                        src={el.avatar}
                      />
                      <div>
                        <Typography variant="h6">
                          <b>{el.fullname}</b>
                          <span className={classes.tweetsUserName}>
                            @{el.username}
                          </span>
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item>
                      <IconButton color="primary">
                        <PersonAddIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </>
            );
          })}

        <ListItem
          className={classnames(
            classes.rightSideListReadingItem,
            classes.rightSideListItem
          )}
        >
          <ListItemText primary="Показать еще" />
        </ListItem>
      </List>
    </Paper>
  );
};
