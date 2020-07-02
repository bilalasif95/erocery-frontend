import { Formik } from "formik";
import pick from "lodash/pick";
import React from "react";

import {useUserDetails} from "@sdk/react";

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
  const { data: user } = useUserDetails();
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
      onSubmit={(values: any, { setSubmitting }) => {
        if (handleSubmit) {
          if(!values.city.city){
            props.errors.push({
              field: "city",
              message: "City is required",
            })
          }
          else {
            values = { ...values, phone: values.phone.length >= 11 ? values.phone : "03"+values.phone };
            handleSubmit(values);
          }
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
        values.phone = user && user.phone.slice(2)
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
