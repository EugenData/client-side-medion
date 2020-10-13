import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps } from 'semantic-ui-react'
import PhoneInput  from "react-phone-input-2";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

export const PhoneInput_:React.FC<IProps> = ({
    country,
    onlyCountries,
    value,
    placeholder,
    onChange
}) => {
    return (
        <PhoneInput
            country={country}
            onlyCountries = {onlyCountries}
            value={value}
            placeholder={placeholder}
            //onChange={(phone) => setPhone(phone)}
        />
    )
}
