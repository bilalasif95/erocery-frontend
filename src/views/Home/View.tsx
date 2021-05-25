import "./scss/index.scss";

import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";

const View: React.FC = () => (
  <div className="home-page">
    {/* <div className="alert">
      <strong>Important Note:</strong> "Our services will remain closed from
      12th May 2021 till 16th May 2021 due to Eid-ul-Fitr Holidays."
    </div> */}
    <TypedHomePageQuery alwaysRender displayLoader={false} errorPolicy="all">
      {({ data, loading }) => {
        return (
          <MetaWrapper
            meta={{
              description: data.shop ? data.shop.description : "",
              title: data.shop ? data.shop.name : "",
            }}
          >
            <Page
              loading={loading}
              backgroundImage={
                data.shop &&
                data.shop.homepageCollection &&
                data.shop.homepageCollection.backgroundImage
              }
              categories={data.categories}
              shop={data.shop}
            />
          </MetaWrapper>
        );
      }}
    </TypedHomePageQuery>
  </div>
);

export default View;
