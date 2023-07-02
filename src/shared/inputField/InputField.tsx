import { ErrorMessage } from "formik";
import { TextInput } from "../../styles/sharedStyles";
import {
  ErrorMessageField,
  InputFieldWrapper,
  InputLabel,
} from "./InputField.style";
interface I_InputField {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  id: string;
  control?: string;
  height?: string;
  padding?: string;
}
const InputField = ({
  type,
  placeholder,
  name,
  label,
  id,
  control,
  height,
  padding,
}: I_InputField) => {
  return (
    <InputFieldWrapper>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <TextInput
        type={type}
        id={id}
        component={control}
        placeholder={placeholder}
        name={name}
        height={height}
        padding={padding}
      />
    </InputFieldWrapper>
  );
};

export default InputField;
