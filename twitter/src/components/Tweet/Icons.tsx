import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import RepeatIcon from "@material-ui/icons/Repeat";

interface IconProps {
  size: number;
}

export const RetweetIcon = styled(RepeatIcon)<IconProps>`
  font-size: ${({ size }) => size}px;
`;

export const LikeIcon = styled(FavoriteIcon)<IconProps>`
  font-size: ${({ size }) => size}px;
`;
export const LikeBorderIcon = styled(FavoriteBorderOutlinedIcon)<IconProps>`
  font-size: ${({ size }) => size}px;
`;
