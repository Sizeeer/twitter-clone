import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UploadImages } from "../pages/Home/components/UploadImages";
import { UploadingImage } from "../pages/Home/components/UploadingImage";
import { useHomePageClasses } from "../pages/Home/theme/theme";
import { fetchTweetStateAction, setFetchTweetStateAction } from "../store/ducks/tweets/actionCreators";
import { FETCH_TWEET_STATE } from "../store/ducks/tweets/contracts/reducer";
import { selectFetchTweetState } from "../store/ducks/tweets/selectors";
import theme from "../theme";
import { axios } from "../utils/axios";
import { PickEmoji } from "./PickEmoji";
import { TweetPaper } from "./Tweet";

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

  const dispatch = useDispatch();
  const fetchTweetState = useSelector(selectFetchTweetState);
  const progressPercent = Math.round((textValue.length / MAX_LENGTH) * 100);
  const textExcess = MAX_LENGTH - textValue.length;

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
    dispatch(setFetchTweetStateAction(FETCH_TWEET_STATE.LOADING));

    var formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      const src = images[i].resultSrc || images[i].src;
      let blobFile = await fetch(src).then((r) => r.blob());
      formData.append("avatar", blobFile);
    }

    const imageUrl: string[] = await axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => data.data);

    dispatch(
      fetchTweetStateAction(textValue, imageUrl, hashtagFormatter(textValue))
    );

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

  const [chosenEmoji, setChosenEmoji] = React.useState<{ emoji: string }>();

  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
  };

  React.useEffect(() => {
    if (formRef.current && chosenEmoji) {
      formRef.current.textContent += chosenEmoji.emoji;
      setTextValue(formRef.current.textContent as string);
    }
  }, [chosenEmoji]);

  return (
    <div>
      <TweetPaper
        className={classes.writeTweet}
        style={{ borderTop: 0 }}
        variant="outlined"
        square
      >
        <Avatar
          className={classes.tweetAvatar}
          alt="User Avatar"
          src="https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=363&q=80"
        />
        <div className={classes.writeTweetAreaWrapper}>
          <div style={{ position: "relative" }}>
            <div
              ref={formRef}
              className={classes.writeTweetArea}
              contentEditable={true}
              onKeyUp={handleKeyUp}
              onInput={handleChange}
              data-placeholder="Что произошло?"
            ></div>
          </div>

          <Divider />
          <div className={classes.writeTweetFooter}>
            <div className={classes.writeTweetFooterItem}>
              <UploadImages
                setImages={setImages}
                disabled={images.length >= 2}
              />
              <PickEmoji onClick={onEmojiClick} />
            </div>
            <div className={classes.writeTweetFooterItem}>
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

              <Button
                disabled={
                  (textValue.length === 0 && images.length === 0) ||
                  progressPercent >= 100 ||
                  fetchTweetState === FETCH_TWEET_STATE.LOADING
                }
                className={classes.navSideTweetBtn}
                color="primary"
                variant="contained"
                onClick={() => {
                  tweetHandler();
                }}
              >
                {fetchTweetState === FETCH_TWEET_STATE.LOADING ? (
                  <CircularProgress color="secondary" size={18} />
                ) : (
                  "Твитнуть"
                )}
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {images.length > 0 &&
              images.map((image) => (
                <UploadingImage
                  key={image.id}
                  src={image.src}
                  deleteImage={deleteImage}
                  addResultSrc={addResultSrc}
                />
              ))}
          </div>
        </div>
      </TweetPaper>
      {fetchTweetState === FETCH_TWEET_STATE.ERROR && (
        <Alert severity="error" style={{ marginTop: 10 }}>
          Добавление твита не удалось <span>😔</span>
        </Alert>
      )}
    </div>
  );
};


