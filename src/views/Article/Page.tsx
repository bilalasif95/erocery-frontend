// import classNames from "classnames";
import * as React from "react";
// import { Link } from "react-router-dom";

// import { RichTextContent } from "@components/atoms";
import {
  DraftailEditor,
  ENTITY_TYPE
} from "draftail";

import "draft-js/dist/Draft.css"

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
