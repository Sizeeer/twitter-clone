import React from "react";
import InnerImageZoom from "react-inner-image-zoom";
import styled from "styled-components";
import Zoom from "react-medium-image-zoom";

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  margin-top: 15px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0px;
  }
`;

const Image = styled(InnerImageZoom)`
  border-radius: 15px;
  width: 100%;
  height: 100%;

  figure {
    border: none;
  }

  div {
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: cover !important;
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  images: string[];
}

export const TweetImages = ({ images }: Props) => {
  return (
    <MainWrapper>
      {images.length > 0 &&
        images.map((src, i) => (
          <ImageWrapper key={src + i}>
            <Zoom
              zoomMargin={50}
              wrapStyle={{ height: "100%", width: "100%", zIndex: 2 }}
            >
              <Image
                src={src}
                alt="tweet image"
                zoomSrc={src}
                zoomPreload={true}
                hideCloseButton={true}
                hideHint={true}
              />
            </Zoom>
          </ImageWrapper>
        ))}
    </MainWrapper>
  );
};
