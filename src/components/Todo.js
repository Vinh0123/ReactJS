// src/components/Todo.js
import React from "react";
import Button from "@atlaskit/button";
import styled, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;

  ${(props) =>
    props.isCompleted &&
    css`
      text-decoration: line-through;
      opacity: 0.6;
    `}

  &:hover .check-icon {
    display: inline-block;
  }
`;

const IconWrapper = styled.span`
  display: none;

  &:hover {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

export default function Todo({ todo, onCheckBtnClick }) {
  return (
    <ButtonStyled
      shouldFitContainer
      isCompleted={todo.isComplete}
      iconAfter={
        <IconWrapper className="check-icon" onClick={() => onCheckBtnClick(todo.id)}>
          <CheckIcon label="check" />
        </IconWrapper>
      }
    >
      {todo.name}
    </ButtonStyled>
  );
}
