import "./scss/index.scss";

import classNames from "classnames";
import React from "react";
import ReactSVG from "react-svg";

import { Modal } from "@components/organisms";

import { maybe } from "@utils/misc";

import AddressSummary from "../../../components/AddressSummary";
import { AddNewShippingAddressForm } from "../../../components/ShippingAddressForm";
import { Option } from "../../components";
import { IAddressPickerProps } from "../../types";

import { TypedStaffListQuery } from "../../queries";


import plusSvg from "../../../images/plus.svg";

const renderAddressesList = ({
  addresses,
  onAddressSelect,
  selectedAddress,
}: IAddressPickerProps) =>{
const addressFilter=addresses.filter((item)=>item.isDefaultShippingAddress!==null)
return (
  addressFilter.map((address, id) => {
    const isSelected = selectedAddress === address;
    return (
      <div
        key={id}
        onClick={() => {
          onAddressSelect(address);
        }}
        className={classNames("address-picker__address", {
          "address-picker__address--selected": isSelected,
        })}
      >
        <AddressSummary address={address} email={address.email} />
        <Option
          selected={isSelected}
          value={`${id}`}
          label="Deliver to this address"
        />
      </div>
    );
  }))}

const renderModalForm = ({
  errors,
  handleAddressAdd,
  hideAddNewModalForm,
  isVisibleModalForm,
  loading,
  type,
  emailRequired,
}: IAddressPickerProps) => (
  <Modal
    show={isVisibleModalForm}
    title="Add New Address"
    disabled={loading}
    formId="new-address-form"
    hide={hideAddNewModalForm}
    submitBtnText="Save"
    cancelBtnText="Cancel"
  >
    <TypedStaffListQuery>
    {({ data }) => {
      return (
        <AddNewShippingAddressForm
          type={type}
          loading={loading}
          errors={errors}
          onSubmit={handleAddressAdd}
          emailRequired={emailRequired}
          cities={maybe(() =>
            data.subshops.map(edge => edge)
          )}
        />
      )}}
    </TypedStaffListQuery>
  </Modal>
);

const AddressPicker: React.FC<IAddressPickerProps> = props => (
  <div className="address-picker">
    {renderAddressesList(props)}
    <div
      className="address-picker__address address-picker__address--add-new"
      onClick={props.showAddNewModalForm}
    >
      <div>
        <ReactSVG path={plusSvg} />
        <p>Add new address</p>
      </div>
    </div>
    {renderModalForm(props)}
  </div>
);

export default AddressPicker;
