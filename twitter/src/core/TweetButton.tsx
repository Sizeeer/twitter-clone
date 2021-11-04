import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import { unlikeTweetAction } from "../store/ducks/user/actionCreators";

export enum TweetButtonColors {
  main = "rgb(29, 161, 242)",
  like = "rgb(235,76,91)",
  retweet = "rgb(80,200,120)",
}

export enum TweetButtonBG {
  mainBG = "rgba(29, 161, 242, 0.04)",
  likeBG = "rgba(235,76,91, 0.04)",
  retweetBG = "rgba(80,200,120, 0.04)",
}

interface TweetButtonInterface {
  children: React.ReactNode;
  color: TweetButtonColors;
  bg: TweetButtonBG;
  counter?: React.ReactElement;
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
});

export const TweetButton: React.FC<TweetButtonInterface> = ({
  children,
  color,
  bg,
  counter,
  fz,
  onClick,
  isLiked,
  isRetweeted,
}) => {
  const stylesObj = { color, bg, fz };
  const { wrapper, active } = useIconButtonStyles(stylesObj);

  return (
    <div
      className={isLiked || isRetweeted ? classNames(active, wrapper) : wrapper}
      onClick={onClick}
    >
      <IconButton>{children}</IconButton>
      {counter}
    </div>
  );
};
