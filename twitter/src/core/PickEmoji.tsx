import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import Picker from "emoji-picker-react";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

interface PickEmojiInterface {
  onClick: (event: any, emojiObject: any) => void;
}

const useStylesTooltip = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.white,
    fontSize: 18,
  },
  tooltip: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px 7px rgba(0, 0, 0, 0.09)",
    pointerEvents: "auto",
  },
}));

export const PickEmoji: React.FC<PickEmojiInterface> = ({ onClick }) => {
  const classesTooltip = useStylesTooltip();
  const pickerRef = React.createRef<any>();

  const [isOpenPicker, setIsOpenPicker] = React.useState(false);

  const handleTooltipOpen = () => {
    setIsOpenPicker(true);
  };

  const handleTooltipClose = () => {
    setIsOpenPicker(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        console.log(pickerRef);

        handleTooltipClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [pickerRef]);

  return (
    <div ref={pickerRef}>
      <Tooltip
        classes={classesTooltip}
        arrow
        open={isOpenPicker}
        PopperProps={{
          disablePortal: true,
        }}
        title={
          <Picker
            onEmojiClick={onClick}
            pickerStyle={{
              backgroundColor: "#fff",
              border: "none",
              boxShadow: "none",
            }}
          />
        }
      >
        <IconButton color="primary" onClick={handleTooltipOpen}>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
