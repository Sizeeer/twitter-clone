// import IconButton from "@material-ui/core/IconButton";
// import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
// import React from "react";
// import { v4 as uuid } from "uuid";

// import { ImageInterface } from "../../../core/TweetForm";
// import { useHomePageClasses } from "../theme/theme";

// interface UploadImagesInterface {
//   setImages: React.Dispatch<React.SetStateAction<ImageInterface[]>>;
//   disabled: boolean;
// }

// export const UploadImages: React.FC<UploadImagesInterface> = ({
//   setImages,
//   disabled,
// }) => {
//   const classes = useHomePageClasses();

//   const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = URL.createObjectURL(event.target.files![0]);

//     setImages((prev) => [...prev, { src: file, resultSrc: null, id: uuid() }]);
//     event.target.value = "";
//   };

//   return (
//     <label htmlFor="upload_file" className={classes.uploadImagesWrapper}>
//       <IconButton color="primary" disabled={disabled}>
//         <input
//           className={classes.uploadImagesInput}
//           id="upload_file"
//           type="file"
//           disabled={disabled}
//           onChange={onChangeHandler}
//         />
//         <ImageOutlinedIcon />
//       </IconButton>
//     </label>
//   );
// };

export {};
