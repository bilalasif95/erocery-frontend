import "./scss/index.scss";

import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
// import { RouteComponentProps } from "react-router-dom";
import ReactSVG from "react-svg";

// import { generatePageUrl } from "../../core/utils";
import { generateBlogUrl } from "../../core/utils";
import eye from "../../images/Eye_icon.svg";
import eyeb from "../../images/Eye_iconB.svg";
import heart from "../../images/Like_icon.svg";
// import { MetaWrapper, NotFound } from "../../components";
// import { STATIC_PAGES } from "../../core/config";
// import { generatePageUrl, maybe } from "../../core/utils";
// import Page from "./Page";
import { TypedAllBlogsQuery, TypedTopBlogsQuery } from "./query";

import { maybe } from "@utils/misc";
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
        <div className="container">
          <TypedTopBlogsQuery>
            {({ data }) => (
              <div className="innerSection">

                <div className="leftBox img-hover-zoom">
                  <Link
                    to={generateBlogUrl(data.blogs.edges && data.blogs.edges[0] && data.blogs.edges[0].node.slug)}
                  >
                    <div
                      className="leftBgImg"
                    >
                      {data.blogs.edges && data.blogs.edges[0] && data.blogs.edges[0].node.image ?
                        <img
                          src={data.blogs.edges && data.blogs.edges[0].node.image.url}
                          alt={data.blogs.edges && data.blogs.edges[0].node.image.alt}
                        />
                        : <div className="noCatImg">
                          <p>Photo Unavailable</p>
                        </div>}
                      <div className="content">
                        <div className="innerContent">
                          <h1>{data.blogs.edges && data.blogs.edges[0] && data.blogs.edges[0].node.title}</h1>
                          <ul className="socialList">
                            <li>
                              <ReactSVG path={eye} />
                              <span>{data.blogs.edges && data.blogs.edges[0] && data.blogs.edges[0].node.views} views</span>
                            </li>
                            <li>
                              <ReactSVG path={heart} />
                              <span>{data.blogs.edges && data.blogs.edges[0] && data.blogs.edges[0].node.likes.totalCount} Likes</span>
                            </li>
                          </ul>
                          <div className="desc">
                            <p>{data.blogs.edges && data.blogs.edges[0] && data.blogs.edges[0].node.description}</p>
                            <Link
                              to={generateBlogUrl(data.blogs.edges && data.blogs.edges[0] && data.blogs.edges[0].node.slug)}
                              className="readmore"
                            >
                              Read More...
                          </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="rightBox">
                  <div className="item img-hover-zoom">
                    <Link
                      to={generateBlogUrl(data.blogs.edges && data.blogs.edges[1] && data.blogs.edges[1].node.slug)}
                    >
                      <div
                        className="rightBgImg"
                      >
                        {data.blogs.edges && data.blogs.edges[1] && data.blogs.edges[1].node.image ?
                          <img
                            src={data.blogs.edges && data.blogs.edges[1].node.image.url}
                            alt={data.blogs.edges && data.blogs.edges[1].node.image.alt}
                          />
                          : <div className="noCatImg">
                            <p>Photo Unavailable</p>
                          </div>}
                        <div className="content">
                          <div className="innerContent">
                            <h1>{data.blogs.edges && data.blogs.edges[1] && data.blogs.edges[1].node.title}</h1>
                            <ul className="socialList">
                              <li>
                                <ReactSVG path={eye} />
                                <span>{data.blogs.edges && data.blogs.edges[1] && data.blogs.edges[1].node.views} views</span>
                              </li>
                              <li>
                                <ReactSVG path={heart} />
                                <span>{data.blogs.edges && data.blogs.edges[1] && data.blogs.edges[1].node.likes.totalCount} Likes</span>
                              </li>
                            </ul>
                            <div className="desc">
                              <p>{data.blogs.edges && data.blogs.edges[1] && data.blogs.edges[1].node.description}</p>
                              <Link
                                to={generateBlogUrl(data.blogs.edges && data.blogs.edges[1] && data.blogs.edges[1].node.slug)}
                                className="readmore"
                              >
                                Read More...
                          </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="item img-hover-zoom">
                    <Link
                      to={generateBlogUrl(data.blogs.edges && data.blogs.edges[2] && data.blogs.edges[2].node.slug)}
                    >
                      <div
                        className="rightBgImg"
                      >
                        {data.blogs.edges && data.blogs.edges[2] && data.blogs.edges[2].node.image ?
                          <img
                            src={data.blogs.edges && data.blogs.edges[2].node.image.url}
                            alt={data.blogs.edges && data.blogs.edges[2].node.image.alt}
                          />
                          : <div className="noCatImg">
                            <p>Photo Unavailable</p>
                          </div>}
                        <div className="content">
                          <div className="innerContent">
                            <h1>{data.blogs.edges && data.blogs.edges[2] && data.blogs.edges[2].node.title}</h1>
                            <ul className="socialList">
                              <li>
                                <ReactSVG path={eye} />
                                <span>{data.blogs.edges && data.blogs.edges[2] && data.blogs.edges[2].node.views} views</span>
                              </li>
                              <li>
                                <ReactSVG path={heart} />
                                <span>{data.blogs.edges && data.blogs.edges[2] && data.blogs.edges[2].node.likes.totalCount} Likes</span>
                              </li>
                            </ul>
                            <div className="desc">
                              <p>{data.blogs.edges && data.blogs.edges[2] && data.blogs.edges[2].node.description}</p>
                              <Link
                                to={generateBlogUrl(data.blogs.edges && data.blogs.edges[2] && data.blogs.edges[2].node.slug)}
                                className="readmore"
                              >
                                Read More...
                          </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </TypedTopBlogsQuery>
          <div className="innerSectionTwo">
            <div className="blog-list">
              <TypedAllBlogsQuery>
                {({ data }) => (
                  <>
                    {maybe(() => data.blogs.edges.map((blog, index) => (
                      <div className="blog-item">
                        <div className="inner">
                          <Link
                            to={generateBlogUrl(blog.node.slug)}
                          >
                            <div className="topPart">
                              <div className="blogNum">
                                <div className="num">
                                  {index + 1}
                                  {/* <span className="expo">st</span> */}
                                </div>
                              </div>
                              <div className="blogImg img-hover-zoom">
                                {blog.node.image ?
                                  <img
                                    src={blog.node.image && blog.node.image.url}
                                    alt={blog.node.image && blog.node.image.alt}
                                  /> :
                                  <div className="noCatImg">
                                    <p>Photo Unavailable</p>
                                  </div>}
                              </div>
                            </div>
                            <div className="bottomPart">
                              <h1>{blog.node.title}</h1>
                              <ul className="socialList">
                                <li>
                                  <ReactSVG path={eyeb} />
                                  <span>{blog.node.views} views</span>
                                </li>
                                <li>
                                  <ReactSVG path={heart} />
                                  <span>{blog.node.likes.totalCount} Likes</span>
                                </li>
                              </ul>
                              <div className="desc">
                                <p>{blog.node.description}</p>
                                <Link
                                  to={generateBlogUrl(blog.node.slug)}
                                  className="readmore"
                                >
                                  Read More...
                              </Link>
                              </div>
                            </div>
                          </Link>
                        </div>

                      </div>
                    )))}
                  </>
                )}
              </TypedAllBlogsQuery>
            </div>
          </div>
        </div>
        {/* <Link to={generateBlogUrl("About-Us")}>Nothing is available</Link> */}
        {/* {slug !== "all" && <IndividualView slug={"hello"} />} */}
      </div>
    </div>
  );
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
