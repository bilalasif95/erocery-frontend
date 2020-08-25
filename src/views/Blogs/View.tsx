import "./scss/index.scss";

import * as React from "react";
// import { Link,RouteComponentProps } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import ReactSVG from "react-svg";

import eye from "../../images/Eye_icon.svg";
import heart from "../../images/Like_icon.svg";
// import { MetaWrapper, NotFound } from "../../components";
// import { STATIC_PAGES } from "../../core/config";
// import { generateBlogUrl } from "../../core/utils";
// import { generatePageUrl, maybe } from "../../core/utils";
// import Page from "./Page";
// import { TypedArticleQuery } from "./query";
// import { Article_shop } from "./types/Article";

// const canDisplay = page =>
//   maybe(() => !!page && !!page.title && !!page.contentJson);
// const getHeaderImage = (shop: Article_shop) =>
//   maybe(() => shop.homepageCollection.backgroundImage.url);

// import { IndividualView } from './IndividualView';

type ViewProps = RouteComponentProps<{ slug: string }>;

export const View: React.FC<ViewProps> = ({
  match: {
    params: { slug },
  },
}) => {
  return (
    <div>
      <div className="mainSection">
        <div className="innerSection">
          <div className="backgroundImage" style={{ backgroundImage: `url(${"https://images.pexels.com/photos/2008426/pexels-photo-2008426.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"})` }}>
            <h1>yhtjfgjfgjhjhgjhg nfgjhjt jfhj</h1>
            <ul className="socialList">
              <li><ReactSVG path={eye} />125 views</li>
              <li><ReactSVG path={heart} />165 Likes</li>
            </ul>
          </div>
        </div>
        <div className="innerSectionTwo">

        </div>
      </div>
      {/* <Link to={generateBlogUrl("hello")}>Nothing is available</Link> */}
      {/* {slug !== "all" && <IndividualView slug={"hello"} />} */}
    </div>

  )
  // <TypedArticleQuery loaderFull variables={{ slug }} errorPolicy="all">
  //   {({ data }) => {
  //     const navigation = STATIC_PAGES.map(page => ({
  //       ...page,
  //       active: page.url === window.location.pathname,
  //     }));
  //     const { page, shop } = data;

  //     if (canDisplay(page)) {
  //       const breadcrumbs = [
  //         {
  //           link: generatePageUrl(slug),
  //           value: page.title,
  //         },
  //       ];
  //       return (
  //         <MetaWrapper
  //           meta={{
  //             description: page.seoDescription,
  //             title: page.seoTitle,
  //           }}
  //         >
  //           <Page
  //             breadcrumbs={breadcrumbs}
  //             headerImage={getHeaderImage(shop)}
  //             navigation={navigation}
  //             page={data.page}
  //           />
  //         </MetaWrapper>
  //       );
  //     }

  //     if (page === null) {
  //       return <NotFound />;
  //     }
  //   }}
  // </TypedArticleQuery>
};
export default View;
