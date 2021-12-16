import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { DialogBox } from "../DialogBox";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: (e: any) => void;
  isLoading: boolean;
}

const StyledButton = withStyles({
  root: {
    backgroundColor: "#F4212E",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#C91B26",
    },
  },
})(Button);

export const DeleteModal = ({ open, onClose, onDelete, isLoading }: Props) => {
  return (
    <DialogBox
      title="Вы уверены, что хотите удалить твит?"
      open={open}
      onClose={onClose}
    >
      <div style={{ width: 437 }}>
        <Typography variant="body1">
          Если вы удалите данный твит, его восстановление будет невозможным. Вы
          хотите продолжить?
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: 15,
          }}
        >
          <Button variant="contained" onClick={onClose}>
            Отмена
          </Button>
          <StyledButton
            variant="contained"
            // style={{ backgroundColor: "#e0245e", color: "#fff" }}
            onClick={onDelete}
            disabled={isLoading}
          >
            Удалить
          </StyledButton>
        </div>
      </div>
    </DialogBox>
  );
};
