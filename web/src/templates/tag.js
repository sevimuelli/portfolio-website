import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Layout } from '@components';
import styled from 'styled-components';
import { theme, mixins, Main } from '@styles';
const { colors, fontSizes } = theme;

const StyledTagsContainer = styled(Main)`
  max-width: 1000px;

  a {
    ${mixins.inlineLink};
  }

  h1 {
    ${mixins.flexBetween};
    margin-bottom: 50px;

    a {
      font-size: ${fontSizes.lg};
      font-weight: 400;
    }
  }

  ul {
    li {
      font-size: 24px;
      h2 {
        font-size: inherit;
        margin: 0;
        a {
          color: ${colors.lightSlate};
        }
      }
      .subtitle {
        color: ${colors.slate};
        font-size: ${fontSizes.sm};

        .tag {
          margin-right: 10px;
        }
      }
    }
  }
`;

const TagTemplate = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges } = data.allSanitySampleProject;


  return (
    <Layout location={location}>
      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/tags">View all tags</Link>
        </span>

        <h1>
          <span>#{tag}</span>
          {/* <span>
            <Link to="/tags">View all tags</Link>
          </span> */}
        </h1>

        <ul className="fancy-list">
          {edges.map(({ node }) => {
            const { title, slug, publishedAt, tags } = node;
            return (
              <li key={slug.current}>
                <h2>
                  <Link to={`/project/${slug.current}/`}>{title}</Link>
                </h2>
                <p className="subtitle">
                  <time>
                    {new Date(publishedAt).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span>&nbsp;&mdash;&nbsp;</span>
                  {tags &&
                    tags.length > 0 &&
                    tags.map((tag, i) => (
                      <Link key={i} to={`/tags/${tag.slug.current}/`} className="tag">
                        #{tag.title}
                      </Link>
                    ))}
                </p>
              </li>
            );
          })}
        </ul>
      </StyledTagsContainer>
    </Layout>
  );
};

export default TagTemplate;

TagTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  }),
  location: PropTypes.object
};

export const pageQuery = graphql`
  query($tag: String!) {
    allSanitySampleProject(
      sort: { fields: publishedAt, order: DESC }
      filter: { tags: { elemMatch: { title: { in: [$tag] } } } }
      limit: 2000
    ) {
      edges {
        node {
          title
          tags {
            title
            slug {
              current
            }
          }
          publishedAt
          slug {
            current
          }
        }
      }
    }
  }
`;
