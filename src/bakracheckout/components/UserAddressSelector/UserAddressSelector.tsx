import React from "react";

import { Button } from "../../../components";
import { FormAddressType } from "../../../components/ShippingAddressForm/types";
import { AddressPicker } from "../../components/AddressPicker";
import { CheckoutFormType, UserAddressSelectorProps } from "../../types";
import { getInitialAddresses } from "./utils";

const UserAddressSelector: React.FC<UserAddressSelectorProps> = ({
  buttonText,
  checkout,
  errors,
  loading,
  onSubmit,
  proceedToNextStep,
  shippingAsBilling,
  type = "shipping" as CheckoutFormType,
  update,
  user,
}) => {
  const [addressesList, addAddressToList] = React.useState<FormAddressType[]>(
    React.useMemo(() => getInitialAddresses({ type, checkout, user }), [
      checkout,
      type,
      user,
    ])
  );
  const [isVisibleModalForm, setModalVisibility] = React.useState<boolean>(
    false
  );
  const [
    selectedAddress,
    setSelectedAddress,
  ] = React.useState<any | null>(
    !shippingAsBilling ? addressesList[0] : null
  );

  const showAddModalForm = React.useCallback(
    () => setModalVisibility(true),
    []
  );
  const hideAddModalForm = React.useCallback(
    () => setModalVisibility(false),
    []
  );
  const unselectAddress = () => {
    if (selectedAddress && shippingAsBilling) {
      setSelectedAddress(null);
    }
  };

  React.useEffect(() => {
    unselectAddress();
  });

  const uncheckShippingAsBilling = () => {
    if (shippingAsBilling) {
      update({
        shippingAsBilling: false,
      });
    }
  };

  const handleAddressSelect = (address: FormAddressType) => {
    setSelectedAddress(address);
    uncheckShippingAsBilling();
  };

  const updateAddresses = (address: FormAddressType) => {
    const isSelectedAsNew = address.asNew;

    if (user.phone) {
      address.phone = user.phone;
    }

    addAddressToList([...addressesList, address]);
    if (isSelectedAsNew) {
      uncheckShippingAsBilling();
      setSelectedAddress(address);
    }
    hideAddModalForm();
  };

  const handleAddressAdd = async (address: FormAddressType) => {
    const success = await onSubmit(address);
    if (success) {
      updateAddresses(address);
    }
  };
  return (
    <>
      <AddressPicker
        addresses={addressesList}
        type={type}
        errors={errors}
        loading={loading}
        onAddressSelect={handleAddressSelect}
        handleAddressAdd={handleAddressAdd}
        selectedAddress={selectedAddress}
        emailRequired={!user.phone}
        isVisibleModalForm={isVisibleModalForm}
        hideAddNewModalForm={hideAddModalForm}
        showAddNewModalForm={showAddModalForm}
      />
      <Button
        type="submit"
        disabled={(selectedAddress && selectedAddress.isDefaultBillingAddress !== null ||  selectedAddress && selectedAddress.isDefaultBillingAddress ===  !undefined ? false:true ) || loading}
        onClick={() => proceedToNextStep(selectedAddress)}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default UserAddressSelector;
