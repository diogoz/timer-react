import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariantsColors = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  background-color: ${(props) => props.theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};

  /* ${(props) => {
    return css`
      background-color: ${buttonVariantsColors[props.variant]};
    `;
  }} */
`;
