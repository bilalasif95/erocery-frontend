import { AddressInterface } from "../../core/types";
import { FormError } from "../Form";

// import {StaffList_staffUsers_edges_node} from "../../checkout/types/StaffList"

export type CheckoutFormType = "billing" | "shipping";
export interface AddressType extends Partial<AddressInterface> {
  email?: string;
}

export interface FormAddressType extends Omit<AddressType, "country"> {
  asBilling?: boolean;
  asNew?: boolean;
  email?: string;
  country: { country?: string; code?: string; value?: string };
}

interface IBaseShippingAddressFormProps {
  type?: CheckoutFormType;
  data?: FormAddressType;
  errors: FormError[];
  loading: boolean;
}
export interface IShippingAddressFormProps
  extends IBaseShippingAddressFormProps {
  buttonText: string;
  onSubmit: (data: FormAddressType) => void;
  shippingAsBilling?: boolean;
  noShipping?: boolean;
}

export interface IShippingNewAddressFormProps
  extends IBaseShippingAddressFormProps {
  onSubmit: (data: FormAddressType) => void;
  emailRequired?: boolean;
  // cities: StaffList_staffUsers_edges_node[];
}
