import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React from "react";
import { TweetButtonBG, TweetButtonColors } from "./ActionsButtons";

interface TweetButtonInterface {
  children: React.ReactNode;
  color: TweetButtonColors;
  bg: TweetButtonBG;
  count: number;
  fz?: number;
  onClick?: (event: any) => void;
  isLiked?: boolean;
  isRetweeted?: boolean;
}

interface IconButtonInterface {
  color: TweetButtonColors;
  bg: TweetButtonBG;
  fz?: number;
}

const useIconButtonStyles = makeStyles({
  wrapper: {
    "& .MuiSvgIcon-root": {
      fontSize: (props: IconButtonInterface) => props.fz || 17,
    },

    "&": {
      marginRight: 20,
    },
    "&:last-child": {
      marginRight: 0,
    },

    "& > *": {
      transition: ".3s all",
    },
    "&:hover": {
      "& .MuiIconButton-root": {
        backgroundColor: (props: IconButtonInterface) => props.bg,
        color: (props: IconButtonInterface) => props.color,
        transition: ".3s all",
      },
      "& span": {
        color: (props: IconButtonInterface) => props.color,
        transition: ".3s all",
      },
    },
  },
  active: {
    "& .MuiSvgIcon-root": {
      fontSize: (props: IconButtonInterface) => props.fz || 17,
    },

    "& > *": {
      transition: ".3s all",
    },

    "& .MuiIconButton-root": {
      color: (props: IconButtonInterface) => props.color,
      transition: ".3s all",
    },
    "& span": {
      color: (props: IconButtonInterface) => props.color,
      transition: ".3s all",
    },
  },
  count: {
    fontSize: 13,
    marginLeft: 5,
  },
});

export const TweetActionButton: React.FC<TweetButtonInterface> = ({
  children,
  color,
  bg,
  count,
  fz,
  onClick,
  isLiked,
  isRetweeted,
}) => {
  const stylesObj = { color, bg, fz };
  const classes = useIconButtonStyles(stylesObj);

  return (
    <div
      className={
        isLiked || isRetweeted
          ? classNames(classes.active, classes.wrapper)
          : classes.wrapper
      }
      onClick={onClick}
    >
      <IconButton>{children}</IconButton>
      <span className={classes.count}>{count}</span>
    </div>
  );
};
