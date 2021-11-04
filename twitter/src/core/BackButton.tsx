import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

export const BackButton: React.FC = () => {
  const history = useHistory();

  const backHandler = () => {
    history.goBack();
  };

  return (
    <IconButton
      color="primary"
      style={{ marginRight: 20 }}
      onClick={backHandler}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};
