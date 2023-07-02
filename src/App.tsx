import InputField from "./shared/inputField/InputField";

import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  FormikProps,
  FormikValues,
} from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import removeIcon from "./assets/remove.svg";
import FilterDropDown from "./shared/dropDown/FilterDropDown";
import { BiCloudUpload } from "react-icons/bi";
import * as yup from "yup";
import {
  ErrorMessageField,
  InputMainWrapper,
} from "./shared/inputField/InputField.style";
import {
  Button,
  ButtonContainer,
  ButtonWrapper,
  CheckBoxContainer,
  CheckBoxFlexBox,
  CheckBoxInputField,
  CheckBoxLabel,
  CheckBoxLayout,
  Container,
  CustomInputField,
  FormLabel,
  Header,
  MultipleField,
  MultipleFieldArrayContainer,
  MultipleFieldContainer,
  RadioBox,
  RadioButtonInputField,
  RadioButtonLabelContainer,
  RadioButtonLabelText,
  RangeInputSlider,
  RangeInputSliderContainer,
  UploadIcon,
  UploadImage,
  UploadImageContainer,
  UploadImageInputField,
  UploadImageLabel,
  UploadVideo,
  Wrapper,
} from "./styles/sharedStyles";

interface I_FileType {
  lastModified: number;
  lastModifiedDate: any;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface I_Country {
  countryName: string;
}
interface I_FormValue {
  name: string;
  pinCode: string;
  email: string;
  website: string;
  password: string;
  confirmPassword: string;
  mobileNo: string;
  gender: string;
  checkedColor: string[];
  description: string;
  date: string;
  time: string;
  ratings: string;
  country: I_Country[];
  programmingLanguage: string;
  image: any;
  video: any;
  audio: any;
}
const genderCategory = [
  {
    id: 1,
    gender: "male",
    label: "Male",
  },
  {
    id: 2,
    gender: "female",
    label: "Female",
  },
  {
    id: 3,
    gender: "others",
    label: "Others",
  },
];
const colorCategory = [
  {
    id: 1,
    color: "red",
    label: "Red",
  },
  {
    id: 2,
    color: "green",
    label: "Green",
  },
  {
    id: 3,
    color: "yellow",
    label: "Yellow",
  },
];

const dropDown = [
  {
    id: 1,
    label: "Javascript",
    value: "javascript",
  },
  {
    id: 2,
    label: "Python",
    value: "python",
  },
  {
    id: 3,
    label: "Java",
    value: "java",
  },
  {
    id: 4,
    label: "Ruby",
    value: "ruby",
  },
];
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const IMAGE_SUPPORTED_FORMAT = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];
const VIDEO_SUPPORTED_FORMAT = [
  "video/mp4",
  "video/webm",
  "video/mkv",
  "image/wmv",
];
const AUDIO_SUPPORTED_FORMAT = ["audio/mp3", "audio/wav", "audio/mpeg"];
const MAX_FILE_SIZE = 1024 * 1024 * 1024;
const validationScheme = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  pinCode: yup
    .number()
    .required("Pin Code is a required field")
    .positive()
    .integer(),
  email: yup.string().required("Email is a required field").email(),
  website: yup.string().required("Website url is a required field").url(),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: yup.string().when("password", {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
  mobileNo: yup
    .string()
    .required("Phone number is a required field")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Invalid mobile no")
    .max(10, "Invalid mobile no"),
  description: yup
    .string()
    .required("Description is a required field")
    .min(10, "To short")
    .max(50, "Too long"),
  date: yup.string().required("Date is a required field"),
  time: yup.string().required("Time is a required field"),
  country: yup
    .array()
    .of(
      yup.object().shape({
        countryName: yup
          .string()
          .min(2, "Too short")
          .required("Required Field"),
      })
    )
    .required("Country field is required")
    .min(2, "Minimum of 2 country")
    .max(4, "Maximum of 4 country"),
  image: yup
    .mixed()
    .nullable()
    .required("Image is a required field")
    .test({
      message: `File too big`,
      test: (file: I_FileType) => {
        const isValid = file?.size < MAX_FILE_SIZE;
        return isValid;
      },
    })
    .test({
      message: `Uploaded file has unsupported format`,
      test: (file: I_FileType) => {
        const isValid = IMAGE_SUPPORTED_FORMAT.includes(file?.type);
        return isValid;
      },
    }),
  video: yup
    .mixed()
    .nullable()
    .required("Video is a required field")
    .test({
      message: `File too big`,
      test: (file: I_FileType) => {
        const isValid = file?.size < MAX_FILE_SIZE;
        return isValid;
      },
    })
    .test({
      message: `Uploaded file has unsupported format`,
      test: (file: I_FileType) => {
        const isValid = VIDEO_SUPPORTED_FORMAT.includes(file?.type);
        return isValid;
      },
    }),
  audio: yup
    .mixed()
    .nullable()
    .required("Audio is a required field")
    .test({
      message: `File too big`,
      test: (file: I_FileType) => {
        const isValid = file?.size < MAX_FILE_SIZE;
        return isValid;
      },
    })
    .test({
      message: `Uploaded file has unsupported format`,
      test: (file: I_FileType) => {
        const isValid = AUDIO_SUPPORTED_FORMAT.includes(file?.type);
        return isValid;
      },
    }),
});

const colorArray = ["red", "green"];
const descriptionSavedData = "Hello this is saved data";

const savedValues: I_FormValue = {
  name: "",
  pinCode: "",
  email: "",
  website: "",
  password: "",
  confirmPassword: "",
  mobileNo: "",
  gender: "male",
  checkedColor: colorArray,
  description: descriptionSavedData,
  date: "",
  time: "",
  ratings: "",
  country: [
    {
      countryName: "",
    },
  ],
  programmingLanguage: "java",
  image: "",
  video: "",
  audio: "",
};

const initialValues: I_FormValue = {
  name: "",
  pinCode: "",
  email: "",
  website: "",
  password: "",
  confirmPassword: "",
  mobileNo: "",
  gender: "male",
  checkedColor: [],
  description: "",
  date: "",
  time: "",
  ratings: "",
  country: [
    {
      countryName: "",
    },
  ],
  programmingLanguage: "java",
  image: "",
  video: "",
  audio: "",
};

const handleSubmit = (value: any) => {
  alert(JSON.stringify(value));
};

const App = () => {
  const [isPolicyAccepted, setPolicyAccepted] = useState<boolean>(false);
  const [isDropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const [isDataSelected, setDataSelected] = useState<string>("Java");
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewVideo, setPreviewVideo] = useState<string>("");
  const [previewAudio, setPreviewAudio] = useState<string>("");

  const onImageChange = (event: Event, setFieldValue: any, errors: any) => {
    console.log("errors", errors);

    const input = event.target as HTMLInputElement;
    if (input?.files && input?.files[0]) {
      setFieldValue("image", input?.files[0]);
      setPreviewImage(URL.createObjectURL(input?.files[0]));
    }
  };

  const onVideoChange = (event: Event, setFieldValue: any) => {
    const input = event.target as HTMLInputElement;
    if (input?.files && input?.files[0]) {
      setFieldValue("video", input?.files[0]);
      setPreviewVideo(URL.createObjectURL(input?.files[0]));
    }
  };

  const onAudioChange = (event: Event, setFieldValue: any) => {
    const input = event.target as HTMLInputElement;
    if (input?.files && input?.files[0]) {
      setFieldValue("audio", input?.files[0]);
      setPreviewAudio(URL.createObjectURL(input?.files[0]));
    }
  };

  return (
    <Container width="90%">
      <Wrapper>
        <Header>Formik Practice</Header>
        <Formik
          initialValues={savedValues || initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationScheme}
          enableReinitialize={true}
        >
          {({
            resetForm,
            values,
            setFieldValue,
            errors,
            dirty,
            isValid,
            touched,
          }: any) => (
            <Form>
              {/* type:name*/}
              <InputMainWrapper>
                <InputField
                  type="text"
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="name" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:pinCode*/}
              <InputMainWrapper>
                <InputField
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  label="Pin Code"
                  placeholder="Enter your pincode"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="pinCode" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:email*/}
              <InputMainWrapper>
                <InputField
                  type="text"
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="email" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:website*/}
              <InputMainWrapper>
                <InputField
                  type="text"
                  id="website"
                  name="website"
                  label="Website"
                  placeholder="Enter your website link"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="website" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:password*/}
              <InputMainWrapper>
                <InputField
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="password" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:confirmPassword*/}
              <InputMainWrapper>
                <InputField
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="confirmPassword" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:mobileNo*/}
              <InputMainWrapper>
                <InputField
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  label="Mobile No"
                  placeholder="Enter your mobile no"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="mobileNo" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:gender*/}
              <InputMainWrapper>
                <FormLabel>Gender</FormLabel>
                <CheckBoxFlexBox>
                  {genderCategory?.map((value) => (
                    <RadioButtonLabelContainer
                      key={value?.id}
                      htmlFor={value?.gender}
                    >
                      <RadioButtonLabelText>
                        {value?.label}
                      </RadioButtonLabelText>
                      <div>
                        <RadioButtonInputField
                          type="radio"
                          name="gender"
                          id={value?.gender}
                          value={value?.gender}
                        />
                        <RadioBox></RadioBox>
                      </div>
                    </RadioButtonLabelContainer>
                  ))}
                </CheckBoxFlexBox>
              </InputMainWrapper>

              {/* type:checkedColor*/}
              <InputMainWrapper>
                <FormLabel>Color</FormLabel>
                <CheckBoxFlexBox>
                  {colorCategory?.map((value) => (
                    <CheckBoxLayout key={value?.color}>
                      <CheckBoxLabel>{value?.label}</CheckBoxLabel>
                      <CheckBoxContainer>
                        <CheckBoxInputField
                          id={value?.color}
                          type="checkbox"
                          name="checkedColor"
                          value={value?.color}
                        />
                        <label htmlFor={value?.color}></label>
                      </CheckBoxContainer>
                    </CheckBoxLayout>
                  ))}
                </CheckBoxFlexBox>
              </InputMainWrapper>

              {/* type:description*/}
              <InputMainWrapper>
                <InputField
                  type="text"
                  control="textarea"
                  id="description"
                  name="description"
                  label="Description"
                  placeholder="Enter your description"
                  height="120px"
                  padding="10px"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="description" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:date*/}
              <InputMainWrapper>
                <InputField
                  type="date"
                  id="date"
                  name="date"
                  label="Date"
                  placeholder="Enter your date"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="date" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:time*/}
              <InputMainWrapper>
                <InputField
                  type="time"
                  id="time"
                  name="time"
                  label="Time"
                  placeholder="Enter your time"
                />
                <ErrorMessageField>
                  <ErrorMessage component="div" name="time" />
                </ErrorMessageField>
              </InputMainWrapper>

              {/* type:ratings*/}
              <InputMainWrapper>
                <FormLabel>Ratings {values?.ratings}</FormLabel>
                <RangeInputSliderContainer>
                  <RangeInputSlider
                    type="range"
                    min="0"
                    max="10"
                    name="ratings"
                  />
                </RangeInputSliderContainer>
              </InputMainWrapper>

              {/* type:country*/}
              <InputMainWrapper>
                <FormLabel>Country Visited</FormLabel>
                <MultipleFieldArrayContainer>
                  <FieldArray name="country">
                    {({ remove, push, replace }) => {
                      return (
                        <div>
                          {values?.country?.length > 0 &&
                            values?.country.map(
                              (friend: any, index: number) => (
                                <MultipleFieldContainer key={index}>
                                  <MultipleField
                                    name={`country.${index}.countryName`}
                                    placeholder="Country"
                                    type="text"
                                  />
                                  <ErrorMessageField>
                                    <ErrorMessage
                                      component="div"
                                      name={`country.${index}.countryName`}
                                    />
                                  </ErrorMessageField>
                                  {index > 0 && (
                                    <img
                                      src={removeIcon}
                                      height="25px"
                                      width="25px"
                                      onClick={() => remove(index)}
                                    />
                                  )}
                                </MultipleFieldContainer>
                              )
                            )}
                          <ButtonContainer>
                            <Button
                              type="button"
                              onClick={() => push({ countryName: "" })}
                            >
                              Add
                            </Button>
                          </ButtonContainer>
                        </div>
                      );
                    }}
                  </FieldArray>
                </MultipleFieldArrayContainer>
                {typeof errors.country === "string" ? (
                  <ErrorMessageField>
                    <ErrorMessage component="div" name="country" />
                  </ErrorMessageField>
                ) : null}
              </InputMainWrapper>

              {/* type:programmingLanguage*/}
              <InputMainWrapper>
                <FormLabel>Programming Language</FormLabel>
                <FilterDropDown
                  setDropDownOpen={setDropDownOpen}
                  isDropDownOpen={isDropDownOpen}
                  filterData={dropDown}
                  setFieldValue={setFieldValue}
                  isDataSelected={isDataSelected}
                  setDataSelected={setDataSelected}
                />
                <CustomInputField name="programmingLanguage" />
              </InputMainWrapper>

              {/* type:image */}
              <InputMainWrapper>
                <FormLabel>Upload Image</FormLabel>
                <UploadImageContainer>
                  {previewImage ? (
                    <UploadImage src={previewImage} alt="image" />
                  ) : (
                    <UploadImageLabel htmlFor="image">
                      <UploadIcon>
                        <BiCloudUpload size={80} color="#000" />
                      </UploadIcon>
                      <UploadImageInputField
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                        onChange={(event: Event) =>
                          onImageChange(event, setFieldValue, errors)
                        }
                      />
                    </UploadImageLabel>
                  )}
                </UploadImageContainer>
                <ButtonContainer>
                  <Button
                    type="button"
                    onClick={() => {
                      setPreviewImage("");
                      setFieldValue("image", "");
                    }}
                  >
                    Remove
                  </Button>
                </ButtonContainer>
                {errors.image || touched.image ? (
                  <ErrorMessageField>{errors.image}</ErrorMessageField>
                ) : null}
              </InputMainWrapper>

              {/* type:video */}
              <InputMainWrapper>
                <FormLabel>Upload Video</FormLabel>
                <UploadImageContainer>
                  {previewVideo ? (
                    <UploadVideo controls loop>
                      <source src={previewVideo} />
                    </UploadVideo>
                  ) : (
                    <UploadImageLabel htmlFor="video">
                      <UploadIcon>
                        <BiCloudUpload size={80} color="#000" />
                      </UploadIcon>
                      <UploadImageInputField
                        type="file"
                        id="video"
                        name="video"
                        onChange={(event: Event) =>
                          onVideoChange(event, setFieldValue)
                        }
                      />
                    </UploadImageLabel>
                  )}
                </UploadImageContainer>
                <ButtonContainer>
                  <Button
                    type="button"
                    onClick={() => {
                      setFieldValue("video", "");
                      setPreviewVideo("");
                    }}
                  >
                    Remove
                  </Button>
                </ButtonContainer>
                {errors.video || touched.video ? (
                  <ErrorMessageField>{errors.video}</ErrorMessageField>
                ) : null}
              </InputMainWrapper>

              {/* type:audio */}
              <InputMainWrapper>
                <FormLabel>Upload Audio</FormLabel>
                {previewAudio ? (
                  <audio controls loop>
                    <source src={previewAudio} />
                  </audio>
                ) : (
                  <UploadImageContainer>
                    <UploadImageLabel htmlFor="audio">
                      <UploadIcon>
                        <BiCloudUpload size={80} color="#000" />
                      </UploadIcon>
                      <UploadImageInputField
                        type="file"
                        id="audio"
                        name="audio"
                        onChange={(event: Event) =>
                          onAudioChange(event, setFieldValue)
                        }
                      />
                    </UploadImageLabel>
                  </UploadImageContainer>
                )}

                <ButtonContainer>
                  <Button
                    type="button"
                    onClick={() => {
                      setFieldValue("audio", "");
                      setPreviewAudio("");
                    }}
                  >
                    Remove
                  </Button>
                </ButtonContainer>
                {errors.audio || touched.audio ? (
                  <ErrorMessageField>{errors.audio}</ErrorMessageField>
                ) : null}
              </InputMainWrapper>

              {/* type:accept_policy */}

              <CheckBoxLayout>
                <CheckBoxContainer>
                  <input
                    id="accept"
                    type="checkbox"
                    checked={isPolicyAccepted}
                    onChange={() => setPolicyAccepted(!isPolicyAccepted)}
                  />
                  <label htmlFor="accept"></label>
                </CheckBoxContainer>
                <CheckBoxLabel>
                  I agree to the Terms & Conditions and Privacy Policy
                </CheckBoxLabel>
              </CheckBoxLayout>

              <ButtonWrapper>
                <Button
                  type="reset"
                  onClick={() => {
                    resetForm();
                    setPreviewAudio("");
                    setPreviewVideo("");
                    setPreviewImage("");
                    setDataSelected("Java");
                    setPolicyAccepted(false);
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={!(isValid && dirty) || !isPolicyAccepted}
                >
                  Submit
                </Button>
              </ButtonWrapper>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default App;
