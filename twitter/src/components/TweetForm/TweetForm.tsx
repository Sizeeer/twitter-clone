import { Box, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { useHomePageClasses } from "../../pages/Home/theme/theme";
import { CreateTweetBody } from "../../shared/types/tweetTypes";
import { selectCurrentUserData } from "../../store/currentUser/selectors";
import theme from "../../theme";
import { axios } from "../../utils/axios";
import { PickEmoji } from "../PickEmoji";
import { useCreateTweet } from "../Tweet/hooks/useCreateTweet";
import { UserAvatar } from "../Tweet/Tweet";
import { TweetButton } from "../TweetButton";
import { UploadImages } from "../UploadImages";
import { UploadingImage } from "../UploadingImage";
import { ErrorMessage } from "./ErrorMessage";

const HASHTAG_FORMATTER = (string: string) => {
  console.log(string.split(/((?:^|\s)(?:#[a-z\d-]+))/gi));

  return string.replace(/(^|\s)(#[a-z\d-]+)/gi, (m, g1, g2) => {
    return g1 + "<span style={color:'green'}>" + g2 + "</span>";
  });
};

const TweetFormWrapper = styled(Paper)`
  border: 0;
  display: flex;
`;

const WriteTweetArea = styled.div`
  width: 100%;
  max-width: 510px;
  max-height: 100px;
  overflow-y: auto;
  outline: none;
  border: none;
  font-size: 20px;
  white-space: pre-wrap;
  margin-bottom: 20px;
  padding-top: 7px;
  cursor: text;
`;

interface TweetInterface {
  classes: ReturnType<typeof useHomePageClasses>;
  maxRows: number;
  rowsMin: number;
}
export interface ImageInterface {
  src: string;
  resultSrc: string | null;
  id: string;
}

const MAX_LENGTH = 280;

export const TweetForm: React.FC<TweetInterface> = ({
  classes,
}: TweetInterface) => {
  const [textValue, setTextValue] = React.useState<string>("");
  const [images, setImages] = React.useState<ImageInterface[]>([]);
  const formRef = React.useRef<HTMLDivElement>(null);
  const { createTweet, isLoading, isError } = useCreateTweet();
  const progressPercent = Math.round((textValue.length / MAX_LENGTH) * 100);
  const textExcess = MAX_LENGTH - textValue.length;
  const currentUserData = useSelector(selectCurrentUserData);
  const hashtagFormatter = (str: string): string[] => {
    const hashtags = str.split(" ").filter((v: string) => {
      if (v.match(/(^|\s)#[a-zA-ZА-Яа-я]+$/g)) {
        return v.trim();
      }

      return false;
    });

    return hashtags;
  };

  const tweetHandler = async (): Promise<void> => {
    var formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      const src = images[i].resultSrc || images[i].src;
      let blobFile = await fetch(src).then((r) => r.blob());
      formData.append("avatar", blobFile);
    }

    const imagesUrls: string[] = await axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => data.data);

    const createTweetBody: CreateTweetBody = {
      text: textValue,
      images: imagesUrls,
      topics: hashtagFormatter(textValue),
    };

    createTweet(createTweetBody);

    if (formRef.current) {
      formRef.current.textContent = "";
    }

    setTextValue("");
    setImages([]);
  };

  const addResultSrc = React.useCallback((src: string, resultSrc: string) => {
    setImages((prev) =>
      prev.map((el) => {
        if (src === el.src) {
          el.resultSrc = resultSrc;
          return el;
        }
        return el;
      })
    );
  }, []);

  const deleteImage = (src: string): void => {
    setImages((prev) => prev.filter((el) => el.src !== src));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.currentTarget.textContent) {
      e.currentTarget.innerHTML = e.currentTarget.textContent.replace(
        /(#\S+)/g,
        `<span style="color: #1da1f2;">$1</span>`
      );
    }

    const range = document.createRange();
    range.selectNodeContents(e.currentTarget);
    range.collapse(false);
    const sel = window.getSelection();
    sel!.removeAllRanges();
    sel!.addRange(range);
  };

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    setTextValue(e.currentTarget.textContent as string);
  };

  return (
    <>
      <TweetFormWrapper variant="outlined" square>
        <UserAvatar alt="user avatar" src={currentUserData?.avatar} />
        <Box flex={1}>
          <Box position="relative">
            <WriteTweetArea
              ref={formRef}
              contentEditable={true}
              onKeyUp={handleKeyUp}
              onInput={handleChange}
              data-placeholder="Что произошло?"
            ></WriteTweetArea>
          </Box>

          <Divider />
          <Box display="flex" justifyContent="space-between" mt={1.5}>
            <Box display="flex" justifyContent="center" ml={-1.8}>
              <UploadImages
                setImages={setImages}
                disabled={images.length >= 2}
              />
              <PickEmoji setTextValue={setTextValue} formRef={formRef} />
            </Box>
            <Box display="flex" justifyContent="center" ml={-2}>
              {textValue.length ? (
                <>
                  <span>{textExcess}</span>
                  <div className={classes.writeTweetFooterItemCircular}>
                    <CircularProgress
                      style={{
                        color:
                          textValue.length >= MAX_LENGTH
                            ? "red"
                            : theme.palette.primary.main,
                      }}
                      variant="determinate"
                      size={20}
                      thickness={4}
                      value={progressPercent < 100 ? progressPercent : 100}
                    />
                    <CircularProgress
                      style={{ color: "rgba(0,0,0,0.1)" }}
                      variant="determinate"
                      size={20}
                      thickness={4}
                      value={100}
                    />
                  </div>
                </>
              ) : null}

              <TweetButton
                disabled={
                  (textValue.length === 0 && images.length === 0) ||
                  progressPercent >= 100 ||
                  isLoading
                }
                color="primary"
                variant="contained"
                onClick={tweetHandler}
              >
                {isLoading ? (
                  <CircularProgress color="secondary" size={18} />
                ) : (
                  "Твитнуть"
                )}
              </TweetButton>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            {images.length > 0 &&
              images.map((image) => (
                <React.Fragment key={image.id}>
                  <UploadingImage
                    src={image.src}
                    deleteImage={deleteImage}
                    addResultSrc={addResultSrc}
                  />
                </React.Fragment>
              ))}
          </Box>
        </Box>
      </TweetFormWrapper>
      <ErrorMessage isError={isError} />
    </>
  );
};
