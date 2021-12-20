import { Box, Typography, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React, { memo } from "react";
import { UserAttributes } from "../shared/types/userTypes";

import { UserAvatar } from "./Tweet/Tweet";

const StyledTypography = withStyles({
  root: {
    fontSize: 15,
  },
  body1: {
    color: "#000!important",
    fontWeight: 700,
  },
  body2: {
    fontWeight: 400,
    color: grey[500],
  },
})(Typography);

interface Props {
  currentUser?: UserAttributes;
}

export const UserInfoFull = memo(({ currentUser }: Props) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <UserAvatar
        style={{ width: 40, height: 40 }}
        alt="user avatar"
        src={currentUser?.avatar}
      />
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <StyledTypography variant="body1">{currentUser?.name}</StyledTypography>
        <StyledTypography variant="body2">
          @{currentUser?.login}
        </StyledTypography>
      </Box>
    </Box>
  );
});
