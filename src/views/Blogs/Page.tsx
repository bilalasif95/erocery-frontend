// import classNames from "classnames";
import * as React from "react";
// import { Link } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";
import ReactSVG from "react-svg";
import heart from "../../images/Like_icon.svg";
import unfilledHeart from "../../images/WhiteLike_icon.svg";

// import { RichTextContent } from "@components/atoms";
import { DraftailEditor, ENTITY_TYPE } from "draftail";

import "draft-js/dist/Draft.css";

// import "draftail/dist/draftail.css"

// import LikeButton from "./LikeButton";

import { Message } from "@components/atoms";
import { TypedBlogLikeUnlikeMutation } from "@sdk/mutations/whishlist";
import { useUserDetails } from "@sdk/react";

// import { Breadcrumb, Breadcrumbs } from "../../components";
import { Breadcrumb } from "../../components";

import LinkEntity from "./LinkEntity";

import ImageEntity from "./ImageEntity";

import { structuredData } from "../../core/SEO/Blog/structuredData";

interface PageNavigationElement {
  active: boolean;
  label: string;
  url: string;
}

interface PageProps {
  breadcrumbs: Breadcrumb[];
  // headerImage: string | null;
  navigation: PageNavigationElement[];
  page: any;
}
export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  // headerImage,
  navigation,
  page,
}) => {
  const { data: user } = useUserDetails();
  const [showNotLoggedMessage, setShowNotLoggedMessage] = React.useState(false);
  const handleNotLoggedMessageClose = () => {
    setShowNotLoggedMessage(false);
  };
  return (
    <div className="article-page">
      {/* <div
      className="article-page__header"
      // style={headerImage ? { backgroundImage: `url(${headerImage})` } : null}
    >
      <span className="article-page__header__title">
        <h1>{page.title}</h1>
      </span>
    </div> */}
      <div className="container">
        {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
        <div>
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(page)}
          </script>
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
              <h2>{page.title}</h2>
            </div>
            <div className="postBy">
              <h4>{page.authorName}</h4>
              <p>{new Date(page.created).toLocaleString()}</p>
              <div className="share-link">
                <div className="likes">
                  <TypedBlogLikeUnlikeMutation>
                    {(blogLikeDislike, { data, loading }) => {
                      return (
                        <>
                          {data === undefined ? page.userLiked ?
                            <>
                              {loading ?
                                <><ReactSVG className="disabledHeart" path={heart} /><p>&nbsp;{page.likes.totalCount} Likes</p></>
                                :
                                <>
                                  <ReactSVG path={heart} onClick={() => {
                                    if (loading) {
                                      return
                                    }
                                    if (!user) {
                                      setShowNotLoggedMessage(true);
                                      return;
                                    } else {
                                      blogLikeDislike({ variables: { id: page.id } })
                                    }
                                  }} /><p>&nbsp;{page.likes.totalCount} Likes</p>
                                </>
                              }
                            </>
                            :
                            <>
                              {loading ?
                                <><ReactSVG className="disabledHeart" path={unfilledHeart} /><p>&nbsp;{page.likes.totalCount} Likes</p></>
                                :
                                <>
                                  <ReactSVG path={unfilledHeart} onClick={() => {
                                    if (loading) {
                                      return
                                    }
                                    if (!user) {
                                      setShowNotLoggedMessage(true);
                                      return;
                                    } else { blogLikeDislike({ variables: { id: page.id } }) }
                                  }} /><p>&nbsp;{page.likes.totalCount} Likes</p>
                                </>}
                            </> : data.blogLikeDislike.blog.userLiked ?
                              <>
                                {loading ?
                                  <><ReactSVG className="disabledHeart" path={heart} /><p>&nbsp;{data.blogLikeDislike.blog.likes.totalCount} Likes</p></>
                                  :
                                  <>
                                    <ReactSVG path={heart} onClick={() => {
                                      if (loading) {
                                        return
                                      }
                                      if (!user) {
                                        setShowNotLoggedMessage(true);
                                        return;
                                      } else { blogLikeDislike({ variables: { id: page.id } }) }
                                    }} /><p>&nbsp;{data.blogLikeDislike.blog.likes.totalCount} Likes</p>
                                  </>}
                              </>
                              :
                              <>
                                {loading ?
                                  <><ReactSVG className="disabledHeart" path={unfilledHeart} /><p>&nbsp;{data.blogLikeDislike.blog.likes.totalCount} Likes</p></>
                                  :
                                  <>
                                    <ReactSVG path={unfilledHeart} onClick={() => {
                                      if (loading) {
                                        return
                                      }
                                      if (!user) {
                                        setShowNotLoggedMessage(true);
                                        return;
                                      } else { blogLikeDislike({ variables: { id: page.id } }) }
                                    }} /><p>&nbsp;{data.blogLikeDislike.blog.likes.totalCount} Likes</p>
                                  </>}
                              </>
                          }
                          {showNotLoggedMessage && (
                            <Message
                              title="Please log in to like the blog"
                              status="error"
                              onClick={handleNotLoggedMessageClose}
                            ></Message>
                          )}
                        </>
                      )
                    }}
                  </TypedBlogLikeUnlikeMutation>
                  {/* <LikeButton productId={page.id} /> */}
                  {/* <ReactSVG path={heart} />
                <p>Like</p> */}
                </div>
                <div className="shares">
                  <p>Share on:</p>
                  <ul>
                    <li><FacebookShareButton url={window.location.href}><FacebookIcon path={window.location.href} size={32} round={true} /></FacebookShareButton></li>
                    <li><WhatsappShareButton url={window.location.href} title="Erocery | Best Online grocery Store(Rawalpindi & Islamabad)" separator=":: "><WhatsappIcon path={window.location.href} size={32} round={true} /></WhatsappShareButton></li>
                    <li><LinkedinShareButton url={window.location.href}><LinkedinIcon path={window.location.href} size={32} round={true} /></LinkedinShareButton></li>
                    <li><TwitterShareButton url={window.location.href} title="Erocery | Best Online grocery Store(Rawalpindi & Islamabad)"><TwitterIcon path={window.location.href} size={32} round={true} /></TwitterShareButton></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="blogLargeImg img-hover-zoom">
              {page.image ?
                <img
                  src={page.image && page.image.url}
                  alt={page.image && page.image.alt}
                /> :
                <div className="noFullCatImg">
                  <p>Photo Unavailable</p>
                </div>}
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
  )
};
export default Page;
