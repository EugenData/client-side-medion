import React from "react";
//import globalizeLocalizer from 'react-widgets-globalize';
import { FieldRenderProps } from "react-final-form";
import dateFnsLocalizer from "react-widgets-date-fns";
import { FormFieldProps, Form } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";
import ru from "date-fns/locale/ru";
import { TextField } from "@material-ui/core";

interface IProps extends FieldRenderProps<Date, any> {
  formatt: string;
}

const DateInput: React.FC<IProps> = ({
  name,
  iD,
  input,
  width,
  date = false,
  time = false,
  type,
  typp,
  placeholder,
  label,
  meta: { touched, error },
  formatt,
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <label>{label}</label>

      <TextField
        name={name}
        margin="dense"
        id={iD}
        title="Дата народження"
        type={typp}
        value={input}
        onChange={input.onChange}
      />
    </Form.Field>
  );
};
export default DateInput;
{
  /* <DateTimePicker
            placeholder={placeholder}
            value={input.value || null}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onKeyDown={(e)=>e.preventDefault()}
            date = {date}
            time = {time}
            defaultValue={undefined}
            format={formatt}
        /> */
}
