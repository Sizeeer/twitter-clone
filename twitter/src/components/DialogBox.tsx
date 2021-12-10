import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface DialogBoxInterface {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  style?: any;
}

const useStyles = makeStyles({
  scrollPaper: {
    alignItems: "flex-start",
  },
});

export const DialogBox: React.FC<DialogBoxInterface> = ({
  title,
  children,
  open,
  onClose,
}: DialogBoxInterface) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ scrollPaper: classes.scrollPaper }}
    >
      <DialogTitle id="alert-dialog-title">
        <IconButton aria-label="close" color="secondary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
