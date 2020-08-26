import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { Article, ArticleVariables } from "./types/Article";
import { Blogs, BlogsVariables } from "./types/Blogs";

const articleQuery = gql`
  query Blog($slug: String!) {
    blog(slug: $slug) {
      contentJson
      id
      seoDescription
      seoTitle
      slug
      title
      views
      userLiked
      likes(first:1){
        totalCount
      }
      created
      image{
        url
        alt
      }
      isPublished
      authorName
      description
    }
  }
`;

export const TypedArticleQuery = TypedQuery<Article, ArticleVariables>(
  articleQuery
);

const allblogsQuery = gql`
  query Blogs {
    blogs(first: 100) {
      edges{
        node{
          id
          title
          image{
            url
            alt
          }
          slug
          userLiked
          likes(first:1){
            totalCount
          }
          views
          created
          isPublished
          authorName
          description
        }
      }
    }
  }
`;

export const TypedAllBlogsQuery = TypedQuery<Blogs, BlogsVariables>(
  allblogsQuery
);

const topblogsQuery = gql`
  query Blogs {
    blogs(first: 3,sortBy:{field: VIEWS, direction: DESC}) {
      edges{
        node{
          id
          title
          image{
            url
            alt
          }
          userLiked
          slug
          likes(first:1){
            totalCount
          }
          views
          created
          isPublished
          authorName
          description
        }
      }
    }
  }
`;

export const TypedTopBlogsQuery = TypedQuery<Blogs, BlogsVariables>(
  topblogsQuery
);
