import React from "react";

export interface IImage {
  url?: string;
  url2x?: string;
  alt?: string;
  zoom?: boolean;
  children?: React.ReactElement;
  defaultImage?: string;
}
