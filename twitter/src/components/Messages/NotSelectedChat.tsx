import { Box, Button, Typography, withStyles } from "@material-ui/core";
import React from "react";

const StyledTypography = withStyles({
  h3: {
    color: "#0f1419",
    fontSize: 31,
  },
  subtitle1: {
    fontSize: 15,
    color: "#536471",
  },
})(Typography);

export const NotSelectedChat = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      borderRight="1px solid rgba(0, 0, 0, 0.12)"
    >
      <StyledTypography variant="h3">
        Вы не выбрали ниодного чата
      </StyledTypography>
      <StyledTypography variant="subtitle1">
        Выберите его слева или начните новый
      </StyledTypography>
      <Box mt={2}>
        <Button color="primary" variant="contained">
          Начать
        </Button>
      </Box>
    </Box>
  );
};
