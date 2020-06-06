import { Formik } from "formik";
import pick from "lodash/pick";
import React from "react";

import { IAddress } from "@types";
import { AddressFormContent } from "./AddressFormContent";
import { IProps } from "./types";

const ADDRESS_FIELDS = [
  "city",
  "companyName",
  "countryArea",
  "firstName",
  "lastName",
  "country",
  "phone",
  "postalCode",
  "streetAddress1",
  "streetAddress2",
];

export const AddressForm: React.FC<IProps> = ({
  address,
  handleSubmit,
  formId,
  defaultValue,
  cities,
  ...props
}: IProps) => {
  let addressWithPickedFields: Partial<IAddress> = {
    // phone: "03",
  };
  if (address) {
    addressWithPickedFields = pick(address, ADDRESS_FIELDS);
  }
  if (defaultValue) {
    addressWithPickedFields.city = defaultValue;
  }
  return (
    <Formik
      initialValues={addressWithPickedFields}
      onSubmit={(values, { setSubmitting }) => {
        if (handleSubmit) {
          handleSubmit(values);
        }
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <AddressFormContent
            {...{
              cities,
              defaultValue,
              formId,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
              values,
            }}
            {...props}
          />
        );
      }}
    </Formik>
  );
};
