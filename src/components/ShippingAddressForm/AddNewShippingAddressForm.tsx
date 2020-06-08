import "./scss/index.scss";

import classNames from "classnames";
import React from "react";

import { Form, Select, TextField  } from "..";

import { ShopContext } from "../ShopProvider/context";
import { FormAddressType, IShippingNewAddressFormProps } from "./types";
import { getFormData } from "./utils";

export const AddNewShippingAddressForm: React.FC<IShippingNewAddressFormProps> = ({
  data,
  errors,
  onSubmit,
  children,
  type,
  emailRequired = true,
  cities,
}) => {

  return (
    <div className="address-form">
      <ShopContext.Consumer>
        {({ countries, geolocalization, defaultCountry }) => (
          <Form<FormAddressType>
            id="new-address-form"
            errors={errors}
            onSubmit={(evt, data) => {
              evt.preventDefault();
              data = { ...data, city: data.city };
              onSubmit(data);
            }}
            data={getFormData(geolocalization, defaultCountry, data)}
          >
            {children}

            <div className="address-form__grid address-form__grid--modal">
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
            <div className="address-form__grid address-form__grid--modal">
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
              className={classNames(
                "address-form__grid address-form__grid--modal",
                {
                  "address-form__grid--full": type === "billing",
                }
              )}
            >
              {type === "shipping" && emailRequired && (
                <TextField
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  name="email"
                  required
                />
              )}
            </div>
            <label className="checkbox checkbox__bottom">
              <input name="asNew" type="checkbox" />
              <span>{`Use this address as new ${type} address`}</span>
            </label>
          </Form>
        )}
      </ShopContext.Consumer>
    </div>
  );
};

export default AddNewShippingAddressForm;
