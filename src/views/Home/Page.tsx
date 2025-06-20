import "./scss/index.scss";

// import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

// import { CachedImage } from "@components/molecules";

import { useUserDetails } from "@sdk/react";
// import ReactSVG from "react-svg";
// import { Button, Loader, ProductsFeatured } from "../../components";
import { Carousel, ProductsFeatured } from "../../components";
import { generateCategoryUrl } from "../../core/utils";

import { TypedBannerImagesQuery } from "./queries";

import { CartContext } from "../../components/CartProvider/context";

// import { history } from "../../history";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./types/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

// import androidStoreImage from "../../images/playstore.png";

// import appleStoreImage from "../../images/applestore.png";

// import desktopvipoffer from "../../images/desktopoffer.png";
import offerImg from "../../images/offerBanner.jpg";
// import vipoffermob from "../../images/vipoffermob.png";

// import noPhotoImg from "../../images/no-photo.svg";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  const { data: user } = useUserDetails();
  const allcategoriesWithoutQurbani = categories && categories.edges && categories.edges.filter(({ node: category }) => {
    return category.name !== "Qurbani"
  });
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };

  const qurbaniPath = { id: "", name: "" };
  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div className="product-page__product__mainSlider">
        <TypedBannerImagesQuery>
          {({ data }) => (
            <Carousel
              autoplay={true}
              wrapAround={true}
              autoplayInterval={3000}
              renderCenterLeftControls={() => null}
              renderCenterRightControls={() => null}
              renderBottomCenterControls={props => {
                const indexes = [];

                for (let i = 0; i < props.slideCount; i++) {
                  indexes.push(i);
                }

                return (
                  <ul className="product-page__product__gallery__nav">
                    {indexes.map(index => (
                      <li
                        key={index}
                        onClick={props.goToSlide.bind(null, index)}
                        className={props.currentSlide === index ? "active" : ""}
                      >
                        <span />
                      </li>
                    ))}
                  </ul>
                );
              }}
            >
              {data.shop.banners &&
                data.shop.banners.map(url => <img src={url.image} alt={url.alt} />)}
              {/* <div
            className="home-page__hero"
            style={{ backgroundImage: `url(${image.url})` }}
          >
          </div>
          <CachedImage url={image.url || noPhotoImg}> */}
              {/* <img src={image.url} />
              {image.name === "banner2" ? (
                <div className="banner2-links">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.rns.erocery"
                    target="_blank"categories
                    <img src={androidStoreImage}></img>
                  </a>
                  <a
                    href="https://apps.apple.com/us/app/id1524601380"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={appleStoreImage} />
                  </a>
                </div>
              ) : (
                ""
              )}
              {image.name === "banner4" ? (
                <div className="appLinks">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.rns.erocery"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={androidStoreImage}></img>
                  </a>
                  <a
                    href="https://apps.apple.com/us/app/id1524601380"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={appleStoreImage} />
                  </a>
                </div>
              ) : (
                ""
              )} */}
              {/* </CachedImage> */}
              {/* </>
          ))} */}
            </Carousel>
          )}
        </TypedBannerImagesQuery>
      </div>
      {/* <div className="home-page__vipImage">
        <div className="container">
          <img src={desktopvipoffer} alt="Online Qurbani Service" className="deskoffer" />
          <img src={vipoffermob} alt="Online Qurbani Service" className="moboffer" />

          <button
            className="bookbtn"
            onClick={() =>
              history.push(
                generateCategoryUrl(qurbaniPath.id, qurbaniPath.name)
              )
            }
          >
            Book Now
          </button>
        </div>
      </div> */}
      {/* <div
        className="home-page__hero"
        style={{ backgroundImage: `url(${bannerimg})` }}
      >
      </div> */}
      {/* <div className="home-page__hero-text">
          <div>
            <span className="home-page__hero__title">
              <h1>Final reduction</h1>
            </span>
          </div>
          <div>
            <span className="home-page__hero__title">
              <h1>Up to 70% off sale</h1>
            </span>
          </div>
        </div> */}
      {/* <div className="home-page__hero-action">
          {loading && !categories ? (
            <Loader />
          ) : (
            categoriesExist() && (
              <Link
                to={generateCategoryUrl(
                  categories.edges[0].node.id,
                  categories.edges[0].node.name
                )}
              >
                <Button>Shop sale</Button>
              </Link>
            )
          )}
        </div> */}
      <CartContext.Consumer>
        {cart => <ProductsFeatured addToCart={cart.add} user={user} />}
      </CartContext.Consumer>
      <div className="home-page__heroImage">
        <img src={offerImg} alt="Buy grocery online" />
      </div>
      {categoriesExist() && (
        <div className="home-page__categories" id={"categorysection"}>
          <div className="container categoriesContainer">
            <h3>Categories</h3>
            {/* <div className="home-page__categories__list">
              {categories.edges.map(({ node: category }) => (
                <div key={category.id} className="categoryBoxes">
                  <Link
                    to={generateCategoryUrl(category.id, category.name)}
                    key={category.id}
                  >
                    <div
                      className={classNames(
                        "home-page__categories__list__image",
                        {
                          "home-page__categories__list__image--no-photo": !category.backgroundImage,
                        }
                      )}
                      style={{
                        backgroundImage: `url(${
                          category.backgroundImage
                            ? category.backgroundImage.url
                            : noPhotoImg
                          })`,
                      }}
                    >
                      <div className="catBg">
                        <h4>{category.name}</h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div> */}
            <div className="home-page__categories__list">
              {allcategoriesWithoutQurbani.map(({ node: category }) => {
                if (category.name === "Qurbani") {
                  qurbaniPath.id = category.id;
                  qurbaniPath.name = category.name;
                }
                return (
                  <div key={category.id} className="categoryBoxes">
                    <Link
                      to={generateCategoryUrl(category.id, category.name)}
                      key={category.id}
                    >
                      <div className="cat-item">
                        <div className="cat-img">
                          {/* <img src={category.backgroundImage
                            ? category.backgroundImage.url
                            : catNoImg}/> */}
                          {/* <ReactSVG path={catImg} /> */}
                          {category.backgroundImage ? (
                            <img alt={category.backgroundImage.alt} src={category.backgroundImage.url} />
                          ) : (
                            <div className="noCatImg">
                              <p>Photo Unavailable</p>
                            </div>
                          )}
                        </div>
                        <div className="cat-detail">
                          <h4>{category.name}</h4>
                          <p>
                            {
                              JSON.parse(category.descriptionJson).blocks[0]
                                .text
                            }
                          </p>
                        </div>
                        <div className="cat-detail-link">
                          <span className="colored" />
                          <span className="trans" />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
