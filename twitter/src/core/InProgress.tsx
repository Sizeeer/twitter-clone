import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { DialogBox } from "./DialogBox";

interface InProgressInterface {
  isOpen: boolean;
  onClose: () => void;
}

export const InProgress: React.FC<InProgressInterface> = ({
  isOpen,
  onClose,
}) => {
  return (
    <DialogBox title="Упс:(" open={isOpen} onClose={onClose}>
      <div style={{ width: 437 }}>
        <Typography variant="body1">
          В данный момент эта функция разрабатывается, в скором времени вы
          сможете её протестировать!
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
          <Button color="primary" variant="contained" onClick={onClose}>
            Продолжить
          </Button>
        </div>
      </div>
    </DialogBox>
  );
};
