// import classNames from "classnames";
import * as React from "react";
// import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import heart from "../../images/Like_icon.svg";

// import { RichTextContent } from "@components/atoms";
import { DraftailEditor, ENTITY_TYPE } from "draftail";

import "draft-js/dist/Draft.css";

// import "draftail/dist/draftail.css"

import { Breadcrumb, Breadcrumbs } from "../../components";

import LinkEntity from "./LinkEntity";

import ImageEntity from "./ImageEntity";

interface PageNavigationElement {
  active: boolean;
  label: string;
  url: string;
}

interface PageProps {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  navigation: PageNavigationElement[];
  page: {
    contentJson: any;
    title: string;
  };
}
export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  headerImage,
  navigation,
  page,
}) => (
  <div className="article-page">
    <div
      className="article-page__header"
      // style={headerImage ? { backgroundImage: `url(${headerImage})` } : null}
    >
      <span className="article-page__header__title">
        <h1>{page.title}</h1>
      </span>
    </div>
    <div className="container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div>
        {/* <div className="article-page__navigation">
          <ul>
            {navigation.map(menuElement => (
              <li
                className={classNames({
                  ["article-page__navigation-element"]: true,
                  ["article-page__navigation-element--active"]:
                    menuElement.active,
                })}
                key={menuElement.url}
              >
                <Link to={menuElement.url}>{menuElement.label}</Link>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="blogDetail">
          <div className="blogTitle">
            <h2>
              Erocery is defining a new era for Grocery Shopping. It has been
              successfully serving clients across Rawalpindi{" "}
            </h2>
          </div>
          <div className="postBy">
            <h4>Abdul Basit</h4>
            <p>14th, August 2020 - 5 mintues read</p>
            <div className="share-link">
              <div className="likes">
                <ReactSVG path={heart} />
                <p>165 Likes</p>
              </div>
              <div className="shares">
                <p>Share on:</p>
                <ul>
                  <li><a href="#"><ReactSVG path={heart} /></a></li>
                  <li><a href="#"><ReactSVG path={heart} /></a></li>
                  <li><a href="#"><ReactSVG path={heart} /></a></li>
                  <li><a href="#"><ReactSVG path={heart} /></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="blogLargeImg img-hover-zoom">
          <img
                  src={
                    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2F1502826406%2F1708w-getty-fruit-closeup-CarstenSchanter-EyeEm.jpg"
                  }
                  alt="Main"
                />
          </div>
        </div>
        <div className="hideLinkIcon">
          <DraftailEditor
            key={JSON.stringify(page.contentJson)}
            rawContentState={JSON.parse(page.contentJson) || null}
            entityTypes={[
              {
                // attributes: ["url"],
                decorator: LinkEntity,
                // icon: <LinkIcon className={classes.linkIcon} />,
                // source: LinkSource,
                type: ENTITY_TYPE.LINK,
              },
              {
                decorator: ImageEntity,
                type: ENTITY_TYPE.IMAGE,
              },
            ]}
            readOnly={true}
          />
          {/* <RichTextContent
              descriptionJson={page.contentJson}
            /> */}
        </div>
      </div>
    </div>
  </div>
);
export default Page;
