import React from "react";
import "./scss/index.scss";

import { AddressFormModal, AddressGrid } from "@components/organisms";
import { useDefaultUserAddress, useDeleteUserAddresss } from "@sdk/react";
import { AddressTypeEnum } from "@sdk/types/globalTypes";
import { ShopContext } from "../../components/ShopProvider/context";

import { maybe } from "@utils/misc";

import { TypedStaffListQuery } from "../../checkout/queries";

const AddressBook: React.FC<{
  user: any;
}> = ({ user }) => {
  const { defaultCountry, countries } = React.useContext(ShopContext);
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState(null);
  const [setDefaultUserAddress] = useDefaultUserAddress();
  const [setDeleteUserAddress] = useDeleteUserAddresss();

  const userAddresses = user.addresses.map(address => {
    const addressToDisplay: any = { address: { ...address } };

    addressToDisplay.onEdit = () => {
      setDisplayEditModal(true);
      if(address.phone.length > 9){
        address.phone = address.phone.slice(2)
      }
      setAddressData({
        address,
        id: address.id,
      });
    };

    addressToDisplay.onRemove = () =>
      setDeleteUserAddress({
        addressId: address.id,
      });

    addressToDisplay.setDefault = (type: string) => {
      setDefaultUserAddress({
        id: address.id,
        type:
          type === "BILLING"
            ? AddressTypeEnum.BILLING
            : AddressTypeEnum.SHIPPING,
      });
    };
    return addressToDisplay;
  });


  return (
    <div className="address-book-container">
      <AddressGrid
        addresses={userAddresses}
        addNewAddress={() => {
          setDisplayNewModal(true);
        }}
      />
      {displayNewModal && (
        <TypedStaffListQuery>
        {({ data }) => {
          return (
        <AddressFormModal
          hideModal={() => {
            setDisplayNewModal(false);
          }}
          userId={user.id}
          {...{ defaultValue: defaultCountry ? defaultCountry : {} }}
          submitBtnText={"Add"}
          title={"Add new address"}
          {...{ options: countries }}
          formId="address-form"
          cities={maybe(() =>
            data.subshops.map(edge => edge)
          )}
        />
        )}}
        </TypedStaffListQuery>
      )}
      {displayEditModal && (
        <TypedStaffListQuery>
        {({ data }) => {
          return (
        <AddressFormModal
          hideModal={() => {
            setDisplayEditModal(false);
          }}
          address={addressData}
          submitBtnText={"Save"}
          title={"Edit address"}
          {...{ options: countries }}
          formId="address-form"
          cities={maybe(() =>
            data.subshops.map(edge => edge)
          )}
        />
        )}}
        </TypedStaffListQuery>
      )}
    </div>
  );
};

export default AddressBook;
