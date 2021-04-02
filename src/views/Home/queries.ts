import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { BannerImagesGet } from "./types/BannersGet";
import { ProductsList } from "./types/ProductsList";

export const homePageQuery = gql`
  query ProductsList {
    shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        name
      }
    }
    categories(level: 0, first: 100) {
      edges {
        node {
          id
          name
          descriptionJson
          backgroundImage {
            alt
            url
          }
        }
      }
    }
  }
`;

export const bannerImagesGet = gql`
  query{
  shop{
    banners{
      image
      alt
    }
  }
}`;

export const TypedBannerImagesQuery = TypedQuery<BannerImagesGet,{}>(bannerImagesGet);

export const TypedHomePageQuery = TypedQuery<ProductsList, {}>(homePageQuery);
