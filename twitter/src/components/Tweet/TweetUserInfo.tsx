import {
  Box,
  IconButton,
  MenuProps,
  Typography,
  withStyles,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserAttributesUI } from "../../shared/types/userTypes";
import { formatDate } from "../../utils/formatDate";
import { Option, PopoverMenu } from "../PopoverMenu";

const HeaderTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DotsBtn = styled(IconButton)`
  transform: rotate(90deg);
  position: absolute;
  top: -5px;
  right: 0px;
  padding: 4px;
`;

const StyledTypography = withStyles({
  root: {
    color: "#000",
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 1.5,
  },
  subtitle1: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  subtitle2: {
    fontWeight: 400,
    color: grey[500],
  },
})(Typography);

const DotsIcon = styled(MoreVertIcon)`
  font-size: 21px;
`;

interface Props {
  user: UserAttributesUI;
  createdAt: Date;
  onClosePopover: (e: any) => any;
  isOwner: boolean;
  options: { owner: Option[]; sub: Option[] };
  handleClick: (e: any) => void;
}

export const TweetUserInfo = ({
  user,
  createdAt,
  anchorEl,
  open,
  onClosePopover,
  isOwner,
  handleClick,
  options,
}: Props & Pick<MenuProps, "anchorEl" | "open">) => {
  return (
    <Box display="flex" justifyContent="space-between" position="relative">
      <HeaderTextWrapper>
        <StyledTypography variant="subtitle1">{user?.name}</StyledTypography>
        &nbsp;
        <StyledTypography variant="subtitle2">
          @{user?.login}&nbsp;
        </StyledTypography>
        <StyledTypography variant="subtitle2">·&nbsp;</StyledTypography>
        <StyledTypography variant="subtitle2">
          {formatDate(new Date(createdAt))}
        </StyledTypography>
      </HeaderTextWrapper>

      <div>
        <DotsBtn onClick={handleClick}>
          <DotsIcon />
        </DotsBtn>
        <PopoverMenu
          options={isOwner ? options.owner : options.sub}
          anchorEl={anchorEl}
          onClose={onClosePopover}
          open={open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        />
      </div>
    </Box>
  );
};
