import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import HomeIcon from "@material-ui/icons/Home";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SearchIcon from "@material-ui/icons/Search";
import TwitterIcon from "@material-ui/icons/Twitter";
import classnames from "classnames";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useHomePageClasses } from "../../pages/Home/theme/theme";
import { logout } from "../../store/auth/authSlice";
import { selectCurrentUserData } from "../../store/currentUser/selectors";
import { DialogBox } from "../DialogBox";
import { PopoverMenu } from "../PopoverMenu";
import { TweetButton } from "../TweetButton";
import { TweetForm } from "../TweetForm/TweetForm";
import { UserInfoFull } from "../UserInfoFull";

interface SideMenuClasses {
  classes: ReturnType<typeof useHomePageClasses>;
}

export const SideMenu: React.FC<SideMenuClasses> = ({
  classes,
}: SideMenuClasses) => {
  const currentUserData = useSelector(selectCurrentUserData);
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);

  const onOpenModal = (): void => {
    setVisibleModal(true);
  };

  const onCloseModal = (): void => {
    setVisibleModal(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpenPopover = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClosePopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const options = useMemo(() => {
    return [
      {
        title: `Выйти @${currentUserData?.login}`,
        action: (event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
          event.stopPropagation();

          dispatch(logout());
          setAnchorEl(null);
        },
        color: "#000",
      },
    ];
  }, []);

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
        paddingRight: 20,
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
            to={`/profile/${currentUserData?.userId}`}
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
        <TweetButton
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => {}}
        >
          Твитнуть
        </TweetButton>
      </div>
      <div
        className={classnames(
          classes.fullTweetHeaderWrapper,
          classes.sideUserCard
        )}
        onClick={handleClick}
      >
        <UserInfoFull currentUser={currentUserData} />

        <MoreVertIcon style={{ transform: "rotate(90deg)" }} />
      </div>
      <PopoverMenu
        options={options}
        anchorEl={anchorEl}
        onClose={onClosePopover}
        open={isOpenPopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            maxWidth: "200px",
            boxShadow:
              "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
            fontWeight: 400,
          },
        }}
      />
      <DialogBox open={visibleModal} onClose={onCloseModal}>
        <div
          style={{
            width: 550,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          <TweetForm classes={classes} maxRows={15} rowsMin={6} />
        </div>
      </DialogBox>
    </div>
  );
};
