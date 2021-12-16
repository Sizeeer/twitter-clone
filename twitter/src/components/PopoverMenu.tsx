import { Menu, MenuItem, MenuProps } from "@material-ui/core";
import React, { MouseEvent, ReactElement } from "react";
import styled from "styled-components";
export interface Option {
  title: string;
  icon?: ReactElement;
  action: (e: MouseEvent<HTMLElement>) => void;
  color: string;
}

interface Props {
  options: Option[];
}

const StyledMenu = styled(Menu)`
  & .MuiMenu-paper {
    box-shadow: 0px 0px 10px 7px rgba(0, 0, 0, 0.09);
  }
  ,
  & .MuiList-padding {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  & .MuiPaper-root {
    width: 384px;
  }

  .MuiPaper-elevation8 {
    box-shadow: 0 !important;
  }
`;

const Item = styled(MenuItem)<{ color: string }>`
  padding: 16px;
  display: flex;
  align-items: center;
  color: ${(props) => props.color};

  svg {
    margin-right: 9px;
  }
`;

export const PopoverMenu = ({
  onClose,
  options,
  ...props
}: Props & MenuProps) => {
  return (
    <StyledMenu onClose={onClose} {...props}>
      {options.map((option) => (
        <div key={option.title}>
          <Item onClick={option.action} color={option.color}>
            {option?.icon}
            <span>{option.title}</span>
          </Item>
        </div>
      ))}
    </StyledMenu>
  );
};
