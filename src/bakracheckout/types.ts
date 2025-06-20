import { Address } from "./types/Address";

import { MutationFn } from "react-apollo";

import { AddressInput } from "../../types/globalTypes";
import { FormAddressType } from "../components";
import { getShop_shop } from "../components/ShopProvider/types/getShop";
import { FormError } from "../core/types";

import { CartLineInterface } from "../components/CartProvider/context";
import { User } from "../components/User/types/User";
import { BakraCheckoutContextInterface } from "./context";
import { Checkout } from "./types/Checkout";

export type AddressType = Partial<
  Omit<Address, "__typename" | "id" | "country">
> & {
  country: {
    code: string;
    country: string;
  };
};

export type CheckoutFormType = "billing" | "shipping";
export interface ICheckoutData {
  shippingAddress: AddressInput;
  phone?: string;
  lines?: CartLineInterface[];
}
export interface IGuestAddressProps {
  buttonText: string;
  checkout: Checkout;
  loading: boolean;
  shop: getShop_shop;
  errors: FormError[];
  proceedToNextStep: (formData: FormAddressType) => void;
  shippingAsBilling?: boolean;
  type?: CheckoutFormType;
  noShipping?: boolean;
}

export interface UserAddressSelectorProps {
  buttonText: string;
  loading: boolean;
  user: User;
  checkout: Checkout;
  errors: FormError[];
  proceedToNextStep: (formData: FormAddressType) => void;
  shippingAsBilling?: boolean;
  type?: CheckoutFormType;
  onSubmit: (selectedAddress: FormAddressType) => Promise<boolean>;
  update?: (checkoutData: BakraCheckoutContextInterface) => void;
}

export interface IInitialUserAddressesArgs {
  checkout: Checkout;
  type: CheckoutFormType;
  user: User;
}

export interface ISubmitArgs {
  phone: string;
  checkoutId: string;
  update: (checkoutData: BakraCheckoutContextInterface) => void;
  createCheckout: MutationFn;
  updateCheckout: MutationFn;
  lines: CartLineInterface[];
}

export interface IAddressPickerProps {
  addresses: any[];
  type: CheckoutFormType;
  errors: FormError[];
  isVisibleModalForm: boolean;
  loading: boolean;
  selectedAddress?: FormAddressType;
  emailRequired?: boolean;
  onAddressSelect: (address: FormAddressType) => void;
  handleAddressAdd: (address: FormAddressType) => void;
  hideAddNewModalForm: () => void;
  showAddNewModalForm: () => void;
}

export interface ICheckoutUserArgs {
  checkout: Checkout;
  user: User;
}
