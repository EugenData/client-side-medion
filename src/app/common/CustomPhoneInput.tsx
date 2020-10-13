import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form } from "semantic-ui-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const CustomPhoneInput: React.FC<IProps> = ({
  input,
  value,
  width,
  type,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      {/* <PhoneInput
        country={"ua"}
        onlyCountries={["ua", "at"]}
        value={value}
        placeholder="Phone"
        onChange={input}
      /> */}
    </Form.Field>
  );
};
export default CustomPhoneInput;
