import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Layout, SEO } from '@components';
import styled from 'styled-components';
import { theme, mixins, Main } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledTagsContainer = styled(Main)`
  max-width: 1000px;

  h1 {
    margin-bottom: 50px;
  }
  ul {
    color: ${colors.lightSlate};
    li {
      font-size: ${fontSizes.xxl};

      a {
        ${mixins.inlineLink};
        color: ${colors.lightSlate};
        .count {
          color: ${colors.slate};
          font-family: ${fonts.SFMono};
          font-size: ${fontSizes.md};
        }
      }
    }
  }
`;

// data: {
//   sanitySiteSettings: { title },
//   allSanityTag: { edges },
// },

function TagsPage({ data, location }) {
  const title = data.pageTitle.title;
  const tagEdges = data.tags.edges;
  const projectEdges = data.projectCount.edges;

  var tagsHolder = [];
  projectEdges.map(({ node }) => node.tags.map(({ title }) => tagsHolder.push(title)));
  var counts = {};
  for (let i = 0; i < tagsHolder.length; i++) {
    counts[tagsHolder[i]] = 1 + (counts[tagsHolder[i]] || 0);
  }

  const filteredTags = tagEdges.filter(({ node }) => counts[node.title] > 0);

  return (
    <Layout location={location}>
      <SEO siteTitle="Tags" sitePath="/tags" />

      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/archive">Back to archive</Link>
        </span>

        <h1>Tags</h1>
        <ul className="fancy-list">
          {filteredTags.map(({ node }) => (
            <li key={node.title}>
              <Link to={`/tags/${node.slug.current}/`}>
                {node.title} <span className="count">({counts[node.title]})</span>
              </Link>
            </li>
          ))}
        </ul>
      </StyledTagsContainer>
    </Layout>
  );
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired
        }).isRequired
      )
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    })
  }),
  location: PropTypes.object
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    pageTitle: sanitySiteSettings {
      title
    }
    tags: allSanityTag(sort: { fields: title }) {
      edges {
        node {
          title
          slug {
            current
          }
        }
      }
    }
    projectCount: allSanitySampleProject(filter: { tags: { elemMatch: { title: { ne: "" } } } }) {
      edges {
        node {
          title
          tags {
            title
          }
        }
      }
    }
  }
`;
