import { useCallback, useState } from "react";

export interface ImageInterface {
  src: string;
  resultSrc: string | null;
  id: string;
}

export const useUploadImages = () => {
  const [images, setImages] = useState<ImageInterface[]>([]);

  const cropImage = useCallback((src: string, resultSrc: string) => {
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

  const deleteImage = useCallback((src: string) => {
    setImages((prev) => prev.filter((el) => el.src !== src));
  }, []);

  return {
    images,
    setImages,
    cropImage,
    deleteImage,
  };
};
