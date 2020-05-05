import "./scss/index.scss";

// import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import {
  useUserDetails
} from "@sdk/react";
// import ReactSVG from "react-svg";
// import { Button, Loader, ProductsFeatured } from "../../components";
import { ProductsFeatured } from "../../components";
import { generateCategoryUrl } from "../../core/utils";

import { CartContext } from "../../components/CartProvider/context";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./types/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import arrowLink from "../../images/catArrow.png";
import catNoImg from "../../images/catNoImg.jpg";

import offerImg from "../../images/offerBanner.jpg";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  const {data: user} = useUserDetails();
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div
        className="home-page__hero"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage.url})` }
            : null
        }
      >
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
      </div>
      <CartContext.Consumer>
        {cart => (
          <ProductsFeatured
            addToCart={cart.add}
            user={user}
          />
        )}
      </CartContext.Consumer>
      <div
        className="home-page__heroImage"
      >
        <img src={offerImg} />
      </div>
      {categoriesExist() && (
        <div className="home-page__categories">
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
              {categories.edges.map(({ node: category }) => (
                <div key={category.id} className="categoryBoxes">
                  <Link
                    to={generateCategoryUrl(category.id, category.name)}
                    key={category.id}
                  >
                    <div className="cat-item">
                      <div className="cat-img">
                        <img src={category.backgroundImage
                            ? category.backgroundImage.url
                            : catNoImg}/>
                        {/* <ReactSVG path={catImg} /> */}
                      </div>
                      <div className="cat-detail">
                        <h4>{category.name}</h4>
                        <p>{JSON.parse(category.descriptionJson).blocks[0].text}</p>
                      </div>
                      <div className="cat-detail-link">
                        <img src={arrowLink} />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
