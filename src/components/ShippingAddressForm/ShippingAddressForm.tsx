import "./scss/index.scss";

import classNames from "classnames";
import React from "react";

import { Button, Form, Select, TextField } from "..";
import { ShopContext } from "../ShopProvider/context";
import { FormAddressType, IShippingAddressFormProps } from "./types";
import { getFormData } from "./utils";

const ShippingAddressForm: React.FC<IShippingAddressFormProps> = ({
  data,
  buttonText,
  errors,
  loading,
  onSubmit,
  children,
  shippingAsBilling = false,
  noShipping = false,
  type = "shipping",
  cities,
}) => {
  return (
    <div className="address-form">
      <ShopContext.Consumer>
        {({ countries, geolocalization, defaultCountry }) => (
          <Form<FormAddressType>
            errors={errors}
            onSubmit={(evt, data) => {
              evt.preventDefault();
              data = { ...data, phone: "03" + data.phone };
              onSubmit(data);
            }}
            data={getFormData(geolocalization, defaultCountry, data)}
          >
            {children}
            <fieldset disabled={shippingAsBilling}>
              <div className="address-form__grid">
                <TextField
                  label="First Name"
                  type="given-name"
                  name="firstName"
                  autoComplete="given-name"
                  required
                />
                <TextField
                  label="Last Name"
                  type="family-name"
                  name="lastName"
                  autoComplete="family-name"
                  required
                />
              </div>
              <div className="address-form__grid">
                <TextField
                  label="Address"
                  type="address-line1"
                  name="streetAddress1"
                  autoComplete="address-line1"
                  required
                />
                {/* <TextField
                label="Company name (optional)"
                type="organization"
                name="companyName"
                autoComplete="organization"
              /> */}
                {/* </div> */}
                {/* <div className="address-form__grid">
              <TextField
                label="ZIP Code"
                type="postal-code"
                name="postalCode"
                autoComplete="postal-code"
                required
              /> */}
                <Select
                  label="City"
                  name="city"
                  options={cities.map(value => ({
                    label: value.city,
                    value: value.city,
                  }))}
                  autoComplete="address-level2"
                />
                {/* <TextField
                label="City"
                type="city"
                name="city"
                autoComplete="address-level2"
                required
              /> */}
              </div>
              <div className="address-form__grid">
                <TextField
                  label="State/Province"
                  type="state"
                  name="countryArea"
                  autoComplete="address-level1"
                />
                <div className="phoneField">
                  <div className="startNum">03</div>
                  <TextField
                    name="phone"
                    autoComplete="tel"
                    label="Phone Number"
                    type="tel"
                    onKeyDown={(evt) => evt.key === '.' && evt.preventDefault()}
                    onCopy={(e) => { e.preventDefault(); return false }}
                    onPaste={(e) => { e.preventDefault(); return false }}
                    required
                  />
                </div>
                {/* <Select
                label="Country"
                name="country"
                options={countries.map(country => ({
                  label: country.country,
                  value: country.code,
                }))}
                autoComplete="country"
              /> */}
              </div>
              <div
                className={classNames("address-form__grid", {
                  "address-form__grid--full": type === "billing",
                })}
              >
                {/* {(type === "shipping" || noShipping) && (
                <TextField
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  name="email"
                  required
                />
              )} */}
              </div>
            </fieldset>
            <Button type="submit" disabled={loading}>
              {loading ? "Loading" : buttonText}
            </Button>
          </Form>
        )}
      </ShopContext.Consumer>
    </div>
  );
};

export default ShippingAddressForm;
