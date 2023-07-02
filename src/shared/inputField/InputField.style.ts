import { ErrorMessage } from "formik";
import styled from "styled-components";
export const InputFieldWrapper = styled.div`
  width: 100%;
`;
export const InputLabel = styled.label`
  display: block;
  font-size: 18px;
  font-family: "Zen Dots", cursive;
  color: #fff;
  margin: 8px 0;
  @media screen and (max-width: 560px) {
    font-size: 16px;
  }
`;

export const ErrorMessageField = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #ff0000;
  margin: 8px 0;
`;
export const InputMainWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
`;
