import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { thunkCommentCreate } from "../store/thunks";

import COLORS from "../utils/colors";

const zoomIn = keyframes`
  0% {
    transform:scale(0);
    color: ${COLORS.light}
  }

  100% {
    transform:scale(1);
    color: ${COLORS.distinctive}
  }
`;

const zoomOut = keyframes`
0% {
  transform:scale(0);
  
}
100% {
  transform:scale(1);
  color: ${COLORS.light}
}
`;

const StyledForm = styled.form`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 20px;
  row-gap: 20px;
  width: 400px;
  top: 50%;
  left: 50%;
  padding: 20px;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  box-shadow: 10px 9px 35px 2px ${COLORS.dark}40;
  background-color: ${COLORS.dark};
  > fieldset:last-of-type {
    grid-column: 1 / 3;
  }

  button {
    grid-column: 1 / 3;
  }
`;

const StyledFieldset = styled.fieldset`
  position: relative;
  border: 0;
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 20px;
  color: ${COLORS.light};
  animation: ${zoomOut} 0.2s forwards;
  &.focus {
    display: block;
    top: -12px;
    left: 10px;
    padding: 0 5px;
    border-radius: 5px;
    color: ${COLORS.distinctive};
    font-size: 10px;
    animation: ${zoomIn} 0.5s forwards;
  }
`;

const StyledInput = styled.input`
  border: 0;
  border-bottom: 2px solid ${COLORS.light};
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 12px;
  color: ${COLORS.light};
  background-color: transparent;
  &:required {
    box-shadow: none;
  }

  &:valid {
    border-color: green;
  }
`;

const StyledTextArea = styled.textarea`
  border: 0;
  border-bottom: 2px solid ${COLORS.light};
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-height: 300px;
  max-width: 400px;
  box-sizing: border-box;
  resize: none;
  background-color: ${COLORS.light}20;
  color: ${COLORS.light};
  &:required {
    box-shadow: none;
  }

  &:valid {
    border-color: green;
  }
`;

const StyledButton = styled.button`
  border: 2px solid ${COLORS.dark};
  border-radius: 20px;
  padding: 20px;
  color: ${COLORS.dark};
  background-color: ${COLORS.distinctive};
  font-weight: 900;
  cursor: pointer;
  &.added {
    background-color: ${COLORS.green};
    cursor: auto;
  }

  &:hover:not(.added) {
    background-color: ${COLORS.light}20;
    border-color: ${COLORS.distinctive};
    color: ${COLORS.distinctive};
  }
`;

interface Props {
  thunkCommentCreate: ({}) => void;
}

const CreateComment = ({ thunkCommentCreate }: Props) => {
  const toggleInputFocus = (
    event: React.FormEvent<
      HTMLInputElement | HTMLFormElement | HTMLTextAreaElement
    >
  ) => {
    event.preventDefault();
    const element = event.currentTarget;
    if (!element) return;
    const previousElement = element.previousElementSibling;
    if (!previousElement) return;
    previousElement.classList.add("focus");
  };

  const toggleInputBlur = (
    event: React.FormEvent<
      HTMLInputElement | HTMLFormElement | HTMLTextAreaElement
    >
  ) => {
    event.preventDefault();
    const element = event.currentTarget;
    if (!element) return;
    if (element.value !== "") return;
    const previousElement = element.previousElementSibling;
    if (!previousElement) return;
    previousElement.classList.remove("focus");
  };

  const submitForm = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    if (!form) return;
    const formElements: any = form.elements;
    if (!form.elements) return;
    const submitButton = formElements["submit"];
    if (!submitButton) return;

    const nameInput = formElements["name"].value;
    const emailInput = formElements["email"].value;
    const bodyInput = formElements["body"].value;

    const newCommentContent = {
      name: nameInput,
      email: emailInput,
      body: bodyInput,
    };

    thunkCommentCreate(newCommentContent);

    submitButton.classList.add("added");
    submitButton.innerText = `DODANO \u2714`;
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.classList.remove("added");
      submitButton.innerText = `Dodaj komentarz`;
      submitButton.disabled = false;
    }, 2000);
    form.reset();
  };

  return (
    <StyledForm onSubmit={submitForm} autoComplete="new-password">
      <StyledFieldset>
        <StyledLabel htmlFor="name">Imię</StyledLabel>
        <StyledInput
          type="text"
          name="name"
          id="name"
          onFocus={toggleInputFocus}
          onBlur={toggleInputBlur}
          required
          pattern="[A-Za-z].{2,}"
        ></StyledInput>
      </StyledFieldset>
      <StyledFieldset>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledInput
          type="email"
          name="email"
          id="email"
          onFocus={toggleInputFocus}
          onBlur={toggleInputBlur}
          required
        ></StyledInput>
      </StyledFieldset>
      <StyledFieldset>
        <StyledLabel htmlFor="body">Treść</StyledLabel>
        <StyledTextArea
          name="body"
          id="body"
          onFocus={toggleInputFocus}
          onBlur={toggleInputBlur}
          minLength={2}
          required
        ></StyledTextArea>
      </StyledFieldset>
      <StyledButton id="submit" type="submit">
        DODAJ KOMANTARZ
      </StyledButton>
    </StyledForm>
  );
};

const mapDispatchToProps = { thunkCommentCreate };

export default connect(null, mapDispatchToProps)(CreateComment);
