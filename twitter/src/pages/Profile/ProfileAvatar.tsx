import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Zoom from "react-medium-image-zoom";
import styled from "styled-components";

const AvatarWrapper = styled.div`
  position: relative;
  margin-top: -77px;
`;

const UserAvatar = styled(Avatar)`
  width: 130px;
  height: 130px;

  border: 4px solid #fff;
`;

interface Props {
  readonly src?: string;
}

export const ProfileAvatar = ({ src }: Props) => {
  return (
    <AvatarWrapper>
      <Zoom
        zoomMargin={50}
        wrapStyle={{ height: "100%", width: "100%", zIndex: 2 }}
      >
        <UserAvatar src={src} />
      </Zoom>
    </AvatarWrapper>
  );
};
