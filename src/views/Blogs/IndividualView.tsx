import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { MetaWrapper, NotFound } from "../../components";
import { STATIC_PAGES } from "../../core/config";
import { generatePageUrl, maybe } from "../../core/utils";
import Page from "./Page";
import { TypedArticleQuery } from "./query";
// import { Article_shop } from "./types/Article";

const canDisplay = page =>
  maybe(() => !!page && !!page.title && !!page.contentJson);
// const getHeaderImage = (shop: Article_shop) =>
//   maybe(() => shop.homepageCollection.backgroundImage.url);

type ViewProps = RouteComponentProps<{ slug: string }>;

export const IndividualView: React.FC<ViewProps> = ({
  match: {
    params: { slug },
  },
}) => (
    <TypedArticleQuery loaderFull variables={{ slug }} errorPolicy="all">
      {({ data }) => {
        const navigation = STATIC_PAGES.map(page => ({
          ...page,
          active: page.url === window.location.pathname,
        }));
        const { blog } = data;

        if (canDisplay(blog)) {
          const breadcrumbs = [
            {
              link: generatePageUrl(slug),
              value: blog.title,
            },
          ];
          return (
            <MetaWrapper
              meta={{
                description: blog.seoDescription,
                title: blog.seoTitle,
              }}
            >
              <Page
                breadcrumbs={breadcrumbs}
                // headerImage={getHeaderImage(shop)}
                navigation={navigation}
                page={data.blog}
              />
            </MetaWrapper>
          );
        }

        if (blog === null) {
          return <NotFound />;
        }
      }}
    </TypedArticleQuery>
  );
export default IndividualView;
