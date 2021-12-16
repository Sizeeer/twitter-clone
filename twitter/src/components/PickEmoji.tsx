import { ClickAwayListener } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import Picker from "emoji-picker-react";
import React, { memo, RefObject, useCallback } from "react";
import styled from "styled-components";

const NonClickableOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 98;
  background-color: transparent;
`;

interface PickEmojiInterface {
  setTextValue: (value: string) => void;
  formRef: RefObject<HTMLDivElement>;
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
    zIndex: 99,
  },
}));

export const PickEmoji = memo(
  ({ setTextValue, formRef }: PickEmojiInterface) => {
    const tooltipStyles = useStylesTooltip();
    const [isOpenPicker, setIsOpenPicker] = React.useState(false);
    const [chosenEmoji, setChosenEmoji] = React.useState<{ emoji: string }>();

    const onEmojiClick = useCallback((e: any, emojiObject: any) => {
      e.stopPropagation();
      setChosenEmoji(emojiObject);
    }, []);

    const handleTooltipOpen = (e: any) => {
      setIsOpenPicker(true);
    };

    const handleTooltipClose = () => {
      setIsOpenPicker(false);
    };

    React.useEffect(() => {
      if (formRef.current && chosenEmoji) {
        formRef.current.textContent += chosenEmoji.emoji;
        setTextValue(formRef.current.textContent as string);
      }
    }, [chosenEmoji, setTextValue, formRef]);

    return (
      <>
        <ClickAwayListener
          onClickAway={handleTooltipClose}
          mouseEvent="onClick"
          touchEvent={false}
        >
          <Tooltip
            classes={tooltipStyles}
            arrow
            open={isOpenPicker}
            enterDelay={0}
            title={
              <div onClick={(e) => e.stopPropagation()}>
                <Picker
                  onEmojiClick={onEmojiClick}
                  pickerStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    boxShadow: "none",
                  }}
                  preload
                />
              </div>
            }
          >
            <IconButton color="primary" onClick={handleTooltipOpen}>
              <EmojiEmotionsOutlinedIcon />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
        {isOpenPicker && <NonClickableOverlay />}
      </>
    );
  }
);
