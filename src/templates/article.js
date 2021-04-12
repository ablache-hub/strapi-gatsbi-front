import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Moment from "react-moment";
import Layout from "../components/layout";
import Markdown from "react-markdown";
import Comments from "../components/comments";

export const query = graphql`
  query ArticleQuery($slug: String!) {
    strapiArticle(slug: { eq: $slug }, status: { eq: "published" }) {
      strapiId
      title
      description
      content
      publishedAt
      image {
        publicURL
        childImageSharp {
          fixed {
            src
          }
        }
      }
      author {
        name
        picture {
          childImageSharp {
            fixed(width: 30, height: 30) {
              src
            }
          }
        }
      }
    }
       allStrapiComments(filter: {article: {slug: { eq: $slug }, status: { eq: "published" }}}) {
    nodes {
      Email
      Message
      created_at(formatString: "DD MMMM YYYY à HH:MM", locale: "FR")
      strapiId
    }
  }
  }
`;

const Article = ({ data }) => {
    const article = data.strapiArticle;
    const comments = data.allStrapiComments.nodes;
    const seo = {
        metaTitle: article.title,
        metaDescription: article.description,
        shareImage: article.image,
        article: true,
    };

    return (
        <Layout seo={seo}>
            <div>
                <div
                    id="banner"
                    className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
                    data-src={article.image.publicURL}
                    data-srcset={article.image.publicURL}
                    data-uk-img
                >
                    <h1>{article.title}</h1>
                </div>

                <div className="uk-section">
                    <div className="uk-container uk-container-small">
                        <Markdown source={article.content} escapeHtml={false} />

                        <hr className="uk-divider-small" />

                        <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                            <div>
                                {article.author.picture && (
                                    <Img
                                        fixed={article.author.picture.childImageSharp.fixed}
                                        imgStyle={{ position: "static", borderRadius: "50%" }}
                                    />
                                )}
                            </div>
                            <div className="uk-width-expand">
                                <p className="uk-margin-remove-bottom">
                                    By {article.author.name}
                                </p>
                                <p className="uk-text-meta uk-margin-remove-top">
                                    <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment-section">
                    <h4 className="comment-header">Commentaires</h4>
                    <Comments comments={comments}/>
                </div>
         {/*       <div>
                <form className="comment-form">
                    <h4 className="comment-post">Laissez un commentaire</h4>
                    <input
                        placeholder="Votre pseudo/nom"
                        value={submit.name}
                        name="name"
                        // onChange={submit.handleChange}
                    />
                    <textarea
                        placeholder="Votre commentaire"
                        rows="4"
                        name="comment"
                        value={submit.comment}
                        // onChange={submit.handleChange}
                    />
                    <div>
                        <button type={"submit"} className="button submit-button">Envoyer</button>
                    </div>
                </form>
            </div>*/}
            </div>
        </Layout>
    );
};

export default Article;