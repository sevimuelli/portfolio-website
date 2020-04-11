import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
// import Layout from '@components/layout';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact } from '@components';
// import Layout from '../components/bc/layout'
import styled from 'styled-components';
import { Main } from '@styles';

import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from '../lib/helpers';

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

const IndexPage = ({ location, data, errors }) => {
  if (errors) {
    return (
      <Layout location={location}>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const { site } = data || {};

  // const featuredNodes = (data || {}).featured
  //   ? mapEdgesToNodes(data.featured)
  //       .filter(filterOutDocsWithoutSlugs)
  //       .filter(filterOutDocsPublishedInTheFuture)
  //   : [];

  // const projectNodes = (data || {}).projects
  //   ? mapEdgesToNodes(data.projects)
  //       .filter(filterOutDocsWithoutSlugs)
  //       .filter(filterOutDocsPublishedInTheFuture)
  //   : [];

  const {
    otherProjectsAspectRatio,
    featuredTitle,
    otherProjectsTitle,
    _rawFrontDescription,
    frontImage,
  } = data.projectsOverview.edges[0].node;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <Hero data={data.intro.edges} />
        <About data={data.about.edges} />
        <Jobs data={data.about.edges} />
        {data.featured && (
          <Featured
            featuredProjects={data.featured.edges}
            SectionTitle={featuredTitle}
            _rawFrontDescription={_rawFrontDescription}
            frontImage={frontImage}
          />
        )}
        {data.projects && (
          <Projects
            projects={data.projects.edges}
            sectionTitle={otherProjectsTitle}
            aspectRatio={otherProjectsAspectRatio}
          />
        )}
        <Contact data={data.contact.edges} />
      </StyledMainContainer>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    intro: allSanityIntroPage {
      edges {
        node {
          name
          subtitle
          title
          _rawDescription
        }
      }
    }
    about: allSanityAboutMe {
      edges {
        node {
          otherSkills
          skills {
            title
            level
            icon {
              alt
              asset {
                _id
                fluid(maxWidth: 70) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
          title
          _rawDescription
          photo {
            alt
            asset {
              _id
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
          workTitle
          workplaces {
            company
            companyURL
            range
            position
            tasks
            startedAt(difference: "days")
          }
        }
      }
    }
    projectsOverview: allSanityProjectOverview {
      edges {
        node {
          otherProjectsAspectRatio
          featuredTitle
          otherProjectsTitle
          _rawFrontDescription
          frontImage {
            asset {
              _id
              fluid(maxWidth: 400) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
        }
      }
    }
    featured: allSanitySampleProject(
      limit: 4
      sort: { fields: [order], order: ASC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null }, featured: { eq: true } }
    ) {
      edges {
        node {
          slug {
            current
          }
          title
          mainImage {
            asset {
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
          }
          _rawExcerpt
          external
          externalLink
          github
          githubLink
          tags {
            title
            slug {
              current
            }
          }
        }
      }
    }
    projects: allSanitySampleProject(
      sort: { fields: [order], order: ASC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null }, featured: { ne: true } }
    ) {
      edges {
        node {
          title
          tech
          github
          githubLink
          externalLink
          external
          mainImage {
            asset {
              _id
              fluid(maxWidth: 500) {
                ...GatsbySanityImageFluid
              }
              metadata {
                lqip
                dimensions {
                  aspectRatio
                }
              }
            }
            alt
          }
          _rawExcerpt
          slug {
            current
          }
          tags {
            title
            slug {
              current
            }
          }
        }
      }
    }
    contact: allSanityContact {
      edges {
        node {
          _rawDescription
          title
        }
      }
    }
  }
`;
