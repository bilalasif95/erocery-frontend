import { IAddress } from "@types";

import {StaffList_staffUsers_edges_node} from "../../../../checkout/types/StaffList";

export interface IProps {
  hideModal: () => void;
  submitBtnText: string;
  target?: HTMLElement | null;
  formId?: string;
  title: string;
  userId?: string;
  address?: {
    address: IAddress;
    id: string;
  };
  cities: StaffList_staffUsers_edges_node[];
}
