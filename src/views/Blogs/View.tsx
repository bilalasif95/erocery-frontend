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
          <div className="innerSection">
            <div className="leftBox img-hover-zoom">
              <div
                className="leftBgImg"
                // style={{
                //   backgroundImage: `url(${"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2F1502826406%2F1708w-getty-fruit-closeup-CarstenSchanter-EyeEm.jpg"})`,
                // }}
              >
                <img
                  src={
                    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2F1502826406%2F1708w-getty-fruit-closeup-CarstenSchanter-EyeEm.jpg"
                  }
                  alt="Main"
                />
                <div className="content">
                  <div className="innerContent">
                    <h1>
                      Lorem Ipsum Lorem Ipsum is simply dummy text of the
                      printing and typesetting industry
                    </h1>
                    <ul className="socialList">
                      <li>
                        <ReactSVG path={eye} />
                        <span>125 views</span>
                      </li>
                      <li>
                        <ReactSVG path={heart} />
                        <span>165 Likes</span>
                      </li>
                    </ul>
                    <div className="desc">
                      <p>
                        {" "}
                        Lorem Ipsum Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry
                      </p>
                      <Link
                        to={generateBlogUrl("About-Us")}
                        className="readmore"
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightBox">
              <div className="item img-hover-zoom">
                <div
                  className="rightBgImg"
                  // style={{
                  //   backgroundImage: `url(${"https://api.time.com/wp-content/uploads/2018/04/strawberries.jpg"})`,
                  // }}
                >
                  <img
                    src={
                      "https://api.time.com/wp-content/uploads/2018/04/strawberries.jpg"
                    }
                    alt="Main"
                  />
                  <div className="content">
                    <div className="innerContent">
                      <h1>Lorem Ipsum Lorem</h1>
                      <ul className="socialList">
                        <li>
                          <ReactSVG path={eye} />
                          <span>125 views</span>
                        </li>
                        <li>
                          <ReactSVG path={heart} />
                          <span>165 Likes</span>
                        </li>
                      </ul>
                      <div className="desc">
                        <p>
                          {" "}
                          Lorem Ipsum Lorem Ipsum is simply dummy &nbsp;
                          <Link
                            to={generateBlogUrl("About-Us")}
                            className="readmore"
                          >
                            Read More...
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item img-hover-zoom">
                <div
                  className="rightBgImg"
                  // style={{
                  //   backgroundImage: `url(${"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/peach-fruit-benefits-1296x728-feature.jpg?w=1155&h=1528"})`,
                  // }}
                >
                  <img
                    src={
                      "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/peach-fruit-benefits-1296x728-feature.jpg?w=1155&h=1528"
                    }
                    alt="Main"
                  />
                  <div className="content">
                    <div className="innerContent">
                      <h1>Lorem Ipsum Lorem Ipsum is</h1>
                      <ul className="socialList">
                        <li>
                          <ReactSVG path={eye} />
                          <span>125 views</span>
                        </li>
                        <li>
                          <ReactSVG path={heart} />
                          <span>165 Likes</span>
                        </li>
                      </ul>
                      <div className="desc">
                        <p>
                          {" "}
                          Lorem Ipsum Lorem Ipsum is simply dummy &nbsp;
                          <Link
                            to={generateBlogUrl("About-Us")}
                            className="readmore"
                          >
                            Read More...
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="innerSectionTwo">
            <div className="blog-list">
              <div className="blog-item">
                <div className="inner">
                  <div className="topPart">
                    <div className="blogNum">
                      <div className="num">
                        01<span className="expo">st</span>
                      </div>
                    </div>
                    <div className="blogImg img-hover-zoom">
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ2KfwAQWMGAYu1x5IFldiFdLgSuMny9XdXg&usqp=CAU"
                        }
                        alt="Blog"
                      />
                    </div>
                  </div>
                  <div className="bottomPart">
                    <h1>Lorem Ipsum Lorem Ipsum is simply dummy text </h1>
                    <ul className="socialList">
                      <li>
                        <ReactSVG path={eyeb} />
                        <span>125 views</span>
                      </li>
                      <li>
                        <ReactSVG path={heart} />
                        <span>165 Likes</span>
                      </li>
                    </ul>
                    <div className="desc">
                      <p>
                        {" "}
                        Lorem Ipsum Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry{" "}
                      </p>
                      <Link
                        to={generateBlogUrl("About-Us")}
                        className="readmore"
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog-item">
                <div className="inner">
                  <div className="topPart">
                    <div className="blogNum">
                      <div className="num">
                        01<span className="expo">st</span>
                      </div>
                    </div>
                    <div className="blogImg img-hover-zoom">
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ2KfwAQWMGAYu1x5IFldiFdLgSuMny9XdXg&usqp=CAU"
                        }
                        alt="Blog"
                      />
                    </div>
                  </div>
                  <div className="bottomPart">
                    <h1>Lorem Ipsum Lorem</h1>
                    <ul className="socialList">
                      <li>
                        <ReactSVG path={eyeb} />
                        <span>125 views</span>
                      </li>
                      <li>
                        <ReactSVG path={heart} />
                        <span>165 Likes</span>
                      </li>
                    </ul>
                    <div className="desc">
                      <p>
                        {" "}
                        Lorem Ipsum Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry{" "}
                      </p>
                      <Link
                        to={generateBlogUrl("About-Us")}
                        className="readmore"
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog-item">
                <div className="inner">
                  <div className="topPart">
                    <div className="blogNum">
                      <div className="num">
                        01<span className="expo">st</span>
                      </div>
                    </div>
                    <div className="blogImg img-hover-zoom">
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ2KfwAQWMGAYu1x5IFldiFdLgSuMny9XdXg&usqp=CAU"
                        }
                        alt="Blog"
                      />
                    </div>
                  </div>
                  <div className="bottomPart">
                    <h1>Lorem Ipsum Lorem</h1>
                    <ul className="socialList">
                      <li>
                        <ReactSVG path={eyeb} />
                        <span>125 views</span>
                      </li>
                      <li>
                        <ReactSVG path={heart} />
                        <span>165 Likes</span>
                      </li>
                    </ul>
                    <div className="desc">
                      <p>
                        {" "}
                        Lorem Ipsum Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry{" "}
                      </p>
                      <Link
                        to={generateBlogUrl("About-Us")}
                        className="readmore"
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog-item">
                <div className="inner">
                  <div className="topPart">
                    <div className="blogNum">
                      <div className="num">
                        01<span className="expo">st</span>
                      </div>
                    </div>
                    <div className="blogImg img-hover-zoom">
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ2KfwAQWMGAYu1x5IFldiFdLgSuMny9XdXg&usqp=CAU"
                        }
                        alt="Blog"
                      />
                    </div>
                  </div>
                  <div className="bottomPart">
                    <h1>Lorem Ipsum Lorem</h1>
                    <ul className="socialList">
                      <li>
                        <ReactSVG path={eyeb} />
                        <span>125 views</span>
                      </li>
                      <li>
                        <ReactSVG path={heart} />
                        <span>165 Likes</span>
                      </li>
                    </ul>
                    <div className="desc">
                      <p>
                        {" "}
                        Lorem Ipsum Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry{" "}
                      </p>
                      <Link
                        to={generateBlogUrl("About-Us")}
                        className="readmore"
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog-item">
                <div className="inner">
                  <div className="topPart">
                    <div className="blogNum">
                      <div className="num">
                        01<span className="expo">st</span>
                      </div>
                    </div>
                    <div className="blogImg img-hover-zoom">
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ2KfwAQWMGAYu1x5IFldiFdLgSuMny9XdXg&usqp=CAU"
                        }
                        alt="Blog"
                      />
                    </div>
                  </div>
                  <div className="bottomPart">
                    <h1>Lorem Ipsum Lorem</h1>
                    <ul className="socialList">
                      <li>
                        <ReactSVG path={eyeb} />
                        <span>125 views</span>
                      </li>
                      <li>
                        <ReactSVG path={heart} />
                        <span>165 Likes</span>
                      </li>
                    </ul>
                    <div className="desc">
                      <p>
                        {" "}
                        Lorem Ipsum Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry{" "}
                      </p>
                      <Link
                        to={generateBlogUrl("About-Us")}
                        className="readmore"
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog-item">
                <div className="inner">
                  <div className="topPart">
                    <div className="blogNum">
                      <div className="num">
                        01<span className="expo">st</span>
                      </div>
                    </div>
                    <div className="blogImg img-hover-zoom">
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ2KfwAQWMGAYu1x5IFldiFdLgSuMny9XdXg&usqp=CAU"
                        }
                        alt="Blog"
                      />
                    </div>
                  </div>
                  <div className="bottomPart">
                    <h1>Lorem Ipsum Lorem</h1>
                    <ul className="socialList">
                      <li>
                        <ReactSVG path={eyeb} />
                        <span>125 views</span>
                      </li>
                      <li>
                        <ReactSVG path={heart} />
                        <span>165 Likes</span>
                      </li>
                    </ul>
                    <div className="desc">
                      <p>
                        {" "}
                        Lorem Ipsum Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry{" "}
                      </p>
                      <Link
                        to={generateBlogUrl("About-Us")}
                        className="readmore"
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog-item">
                <div className="inner">
                  <div className="topPart">
                    <div className="blogNum">
                      <div className="num">
                        01<span className="expo">st</span>
                      </div>
                    </div>
                    <div className="blogImg img-hover-zoom">
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ2KfwAQWMGAYu1x5IFldiFdLgSuMny9XdXg&usqp=CAU"
                        }
                        alt="Blog"
                      />
                    </div>
                  </div>
                  <div className="bottomPart">
                    <h1>Lorem Ipsum Lorem</h1>
                    <ul className="socialList">
                      <li>
                        <ReactSVG path={eyeb} />
                        <span>125 views</span>
                      </li>
                      <li>
                        <ReactSVG path={heart} />
                        <span>165 Likes</span>
                      </li>
                    </ul>
                    <div className="desc">
                      <p>
                        {" "}
                        Lorem Ipsum Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry{" "}
                      </p>
                      <Link
                        to={generateBlogUrl("About-Us")}
                        className="readmore"
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog-item">
                <div className="inner">
                  <div className="topPart">
                    <div className="blogNum">
                      <div className="num">
                        01<span className="expo">st</span>
                      </div>
                    </div>
                    <div className="blogImg img-hover-zoom">
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ2KfwAQWMGAYu1x5IFldiFdLgSuMny9XdXg&usqp=CAU"
                        }
                        alt="Blog"
                      />
                    </div>
                  </div>
                  <div className="bottomPart">
                    <h1>Lorem Ipsum Lorem</h1>
                    <ul className="socialList">
                      <li>
                        <ReactSVG path={eyeb} />
                        <span>125 views</span>
                      </li>
                      <li>
                        <ReactSVG path={heart} />
                        <span>165 Likes</span>
                      </li>
                    </ul>
                    <div className="desc">
                      <p>
                        {" "}
                        Lorem Ipsum Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry{" "}
                      </p>
                      <Link
                        to={generateBlogUrl("About-Us")}
                        className="readmore"
                      >
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
