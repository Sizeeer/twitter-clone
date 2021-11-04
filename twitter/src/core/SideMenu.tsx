import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DialogBox } from "./DialogBox";
import { TweetForm } from "./TweetForm";
import { useHomePageClasses } from "../pages/Home/theme/theme";
import { selectUserData } from "../store/ducks/user/selectors";
import { logoutAction } from "../store/ducks/user/actionCreators";

interface SideMenuClasses {
  classes: ReturnType<typeof useHomePageClasses>;
}

const selectOptions = [
  {
    id: "dfsdsdgs",
    title: "Выйти",
  },
];

export const SideMenu: React.FC<SideMenuClasses> = ({
  classes,
}: SideMenuClasses) => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);

  const onOpenModal = (): void => {
    setVisibleModal(true);
  };

  const onCloseModal = (): void => {
    setVisibleModal(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (event.currentTarget.textContent === "Выйти") {
      dispatch(logoutAction());
    }
    setAnchorEl(null);
  };
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div>
        <ul className={classes.navSideList}>
          <Link to="/home">
            <li className={classes.navSideListItem}>
              <IconButton color="primary">
                <TwitterIcon className={classes.navMainIcon} />
              </IconButton>
            </li>
          </Link>
          <li className={classes.navSideListItem}>
            <div>
              <HomeIcon className={classes.navSideListIcon} />
              <Typography variant="h6" className={classes.navSideListItemLabel}>
                Главная
              </Typography>
            </div>
          </li>
          <li className={classes.navSideListItem}>
            <div>
              <SearchIcon className={classes.navSideListIcon} />
              <Typography variant="h6" className={classes.navSideListItemLabel}>
                Поиск
              </Typography>
            </div>
          </li>
          <li className={classes.navSideListItem}>
            <div>
              <EmailOutlinedIcon className={classes.navSideListIcon} />
              <Typography variant="h6" className={classes.navSideListItemLabel}>
                Сообщения
              </Typography>
            </div>
          </li>
          <Link
            to={`/profile/${userData?.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={classes.navSideListItem}>
              <div>
                <PersonOutlineOutlinedIcon
                  className={classes.navSideListIcon}
                />
                <Typography
                  variant="h6"
                  className={classes.navSideListItemLabel}
                >
                  Профиль
                </Typography>
              </div>
            </li>
          </Link>
        </ul>
        <Button
          className={classes.navSideTweetBtn}
          color="primary"
          variant="contained"
          fullWidth
          onClick={onOpenModal}
        >
          Твитнуть
        </Button>
      </div>
      <div
        className={classnames(
          classes.fullTweetHeaderWrapper,
          classes.sideUserCard
        )}
        onClick={handleClick}
      >
        <div className={classnames(classes.fullTweetHeaderInfo)}>
          <Avatar
            className={classes.tweetAvatar}
            style={{ width: 40, height: 40 }}
            alt="User Avatar"
            src={userData?.avatar}
          />
          <Typography className={classes.sideUserCardInfo}>
            <b>{userData?.fullname}</b>{" "}
            <div>
              <span className={classes.tweetsUserName}>
                @{userData?.username}
              </span>
              &nbsp;
            </div>
          </Typography>
        </div>
        <>
          <MoreVertIcon style={{ transform: "rotate(90deg)" }} />
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            {selectOptions.map((option) => (
              <MenuItem key={option.id} onClick={handleClose}>
                {option.title}
              </MenuItem>
            ))}
          </Menu>
        </>
      </div>
      <DialogBox open={visibleModal} onClose={onCloseModal}>
        <div style={{ width: 550 }}>
          <TweetForm classes={classes} maxRows={15} rowsMin={6} />
        </div>
      </DialogBox>
    </div>
  );
};
