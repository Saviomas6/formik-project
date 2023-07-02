import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

export const Container = styled.div<any>`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding-right: var(1.5rem, 0.75rem);
  padding-left: var(1.5rem, 0.75rem);
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    max-width: 90%;
  }
  @media (min-width: 768px) {
    max-width: 90%;
  }
  @media (min-width: 992px) {
    max-width: 90%;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`;

export const TextInput = styled(Field)`
  display: block;
  height: ${(props) => props.height || "44px"};
  width: 100%;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-family: "Zen Dots", cursive;
  border-radius: 10px;
  background-color: #f6f6f6;
  color: #000;
  padding: ${(props) => props.padding || "0px 26px"};
  font-size: 18px;
  font-weight: 500;
  resize: none;
  ::placeholder {
    color: #808080;
  }
  @media screen and (max-width: 560px) {
    height: ${(props) => props.height || "34px"};
    width: 100%;
    padding: ${(props) => props.padding || "0px 10px"};
    font-size: 16px;
  }
`;

export const ButtonWrapper = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const Button = styled.button`
  height: 45px;
  width: 130px;
  background-color: #4de3f8;
  font-size: 18px;
  font-family: "Zen Dots", cursive;
  color: #000;
  border: none;
  outline: none;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s linear;
  :hover {
    -webkit-box-shadow: 0px 0px 61px -9px rgba(77, 227, 248, 1);
    -moz-box-shadow: 0px 0px 61px -9px rgba(77, 227, 248, 1);
    box-shadow: 0px 0px 61px -9px rgba(77, 227, 248, 1);
  }
  :disabled {
    opacity: 0.5;
  }
  @media screen and (max-width: 560px) {
    height: 40px;
    width: 120px;
    font-size: 14px;
  }
`;

//radio button style
export const RadioButtonLabelContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 5px 0;
  cursor: pointer;
`;

export const RadioButtonLabelText = styled.div`
  font-weight: 400;
  color: #fff;
  @media screen and (max-width: 560px) {
    font-size: 12px;
  }
`;

export const RadioBox = styled.div`
  height: 15px;
  width: 15px;
  margin: 0 15px;
  border: 1px solid #808080;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1px;
  @media screen and (max-width: 560px) {
    margin: 0 10px;
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    background: #4de3f8;
    border-radius: 50%;
    cursor: pointer;
    transform: scale(0);
    transition: all linear 0.2s;
  }
`;

export const RadioButtonInputField = styled(Field)`
  display: none;
  &:checked + ${RadioBox} {
    &::after {
      transform: scale(1);
      transition: all linear 0.2s;
    }
  }
`;

//checkbox style
export const CheckBoxLayout = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;
export const CheckBoxLabel = styled.div`
  text-transform: capitalize;
  @media screen and (max-width: 560px) {
    font-size: 12px;
  }
`;

export const CheckBoxContainer = styled.div<any>`
  height: 22px;
  margin: 0 10px;
  display: flex;
  @media screen and (max-width: 560px) {
    margin: 0 5px;
  }
  > input {
    opacity: 0;
  }
  > input + label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 1px;
      width: 20px;
      height: 20px;
      border: 1px solid #000;
      background: #fff;
      border-radius: 3px;
    }
    &:after {
      content: "";
      width: 16px;
      height: 16px;
      border-radius: 2px;
      position: absolute;
      top: 4px;
      left: 3px;
      font-size: 18px;
      background-color: aqua;
      transition: all 0.2s;
    }
  }
  > input:not(:checked) + label {
    &:after {
      opacity: 0;
      transform: scale(0);
    }
  }
  > input:disabled:not(:checked) + label {
    &:before {
      box-shadow: none;
      border-color: #bbb;
      background-color: #ddd;
    }
  }
  > input:checked + label {
    &:after {
      opacity: 1;
      transform: scale(1);
    }
  }
  > input:disabled:checked + label {
    &:after {
      color: #999;
    }
  }
  > input:disabled + label {
    color: #aaa;
  }
  > input:checked:focus + label,
  input:not(:checked):focus + label {
    &:before {
      border: 1px solid #000;
    }
  }
`;
export const CheckBoxInputField = styled(Field)`
  /* ... */
`;

export const RangeInputSliderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`;

export const RangeInputSlider = styled(Field)`
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 50%;

  /* Removes default focus */
  :focus {
    outline: none;
  }

  ::-webkit-slider-runnable-track {
    background-color: #43d2e5;
    border-radius: 1rem;
    height: 1rem;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: -8px; /* Centers thumb on the track */
    background-color: #fff;
    border-radius: 1rem;
    height: 2rem;
    width: 2rem;
  }

  :focus::-webkit-slider-thumb {
    outline: 3px solid #000000;
    outline-offset: 0.125rem;
  }

  ::-moz-range-track {
    background-color: #43d2e5;
    border-radius: 1rem;
    height: 1rem;
  }

  ::-moz-range-thumb {
    background-color: #000000;
    border: none;
    border-radius: 1rem;
    height: 2rem;
    width: 2rem;
  }

  :focus::-moz-range-thumb {
    outline: 3px solid #000000;
    outline-offset: 0.125rem;
  }
`;
export const MultipleFieldContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MultipleField = styled(Field)<any>`
  display: block;
  height: ${(props) => props.height || "44px"};
  width: 50%;
  outline: none;
  border: none;
  font-family: "Zen Dots", cursive;
  border-radius: 10px;
  background-color: #f6f6f6;
  color: #000;
  padding: ${(props) => props.padding || "0px 26px"};
  font-size: 18px;
  font-weight: 500;
  resize: none;
  ::placeholder {
    color: #808080;
  }
  @media screen and (max-width: 560px) {
    height: ${(props) => props.height || "34px"};
    width: 50%;
    padding: ${(props) => props.padding || "0px 10px"};
    font-size: 16px;
  }
`;

export const ButtonContainer = styled.div`
  margin: 10px 0;
`;

export const CustomInputField = styled(Field)`
  display: none;
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  font-size: 50px;
  color: #fff;
  margin-top: 30px;
  text-align: center;
  @media screen and (max-width: 560px) {
    font-size: 35px;
  }
`;

export const FormLabel = styled.div`
  display: block;
  font-size: 18px;
  font-family: "Zen Dots", cursive;
  color: #fff;
  margin: 8px 0;
  @media screen and (max-width: 560px) {
    font-size: 16px;
  }
`;

export const CheckBoxFlexBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const MultipleFieldArrayContainer = styled.div``;

export const UploadImageContainer = styled.div`
  height: 250px;
  width: 50%;
  border-radius: 10px;
  background-color: #ececec;
  margin: 8px 0;
  cursor: pointer;
  @media screen and (max-width: 560px) {
    width: 100%;
  }
`;
export const UploadImageLabel = styled.label`
  display: block;
  height: 100%;
  width: 100%;
`;
export const UploadImageInputField = styled(Field)`
  display: none;
`;

export const UploadIcon = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UploadImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;
export const UploadVideo = styled.video`
  height: 100%;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;
export const Error = styled(ErrorMessage)`
  font-size: 12px;
  color: #ff0000;
`;
