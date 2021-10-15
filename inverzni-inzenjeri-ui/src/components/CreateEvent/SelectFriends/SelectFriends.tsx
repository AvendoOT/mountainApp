import { FieldProps } from "formik";
import React from "react";
import Select, { Option, ReactSelectProps } from "react-select";

export const SelectFriends: React.FunctionComponent<
  ReactSelectProps & FieldProps
> = ({ options, field, form }) => {
  const style = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? "0px 0px 0px 1px #2e82f4" : "1px solid #ccc",
      boxShadow: "none",
      transition: "0.5s",
      ":hover": {
        border: state.isFocused ? "0px 0px 0px 1px #2e82f4" : "1px solid #ccc",
      },
      // This line disable the blue border
    }),
  };

  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      option == null
        ? []
        : (option as Option[]).map((item: Option) => item.value)
    );
  };
  return (
    <Select
      isMulti={true}
      options={options}
      styles={style}
      onChange={onChange}
      onBlur={() => {
        form.setFieldTouched("invitedFriends", true);
      }}
    />
  );
};
