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
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers';
// import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import ProjectPreviewGrid from '../components/project-preview-grid';
import SEO from '../components/seo';

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

  const featuredTitle = data.featuredTitle.edges[0].node.title;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout location={location}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <StyledMainContainer className="fillHeight">
        {/* <h1 hidden>Welcome to {site.title}</h1> */}
        <Hero data={data.intro.edges} />
        <About data={data.about.edges} />
        <Jobs data={data.about.edges} />
        {data.featured && (
          <Featured featuredProjects={data.featured.edges} SectionTitle={featuredTitle} />
        )}
        {/* {projectNodes && (
          <ProjectPreviewGrid
            title="Latest projects"
            nodes={projectNodes}
            browseMoreHref="/archive/"
          />
        )} */}
      </StyledMainContainer>
    </Layout>
  );

  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      {/* <Hero data={data.hero.edges} />
      <About data={data.about.edges} />
      <Jobs data={data.jobs.edges} />
      <Featured data={data.featured.edges} />
      <Projects data={data.projects.edges} />
      <Contact data={data.contact.edges} /> */}
    </StyledMainContainer>
  </Layout>;
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
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
          }
        }
      }
    }
    featuredTitle: allSanityProjectOverview {
      edges {
        node {
          title
        }
      }
    }
    featured: allSanitySampleProject(
      limit: 4
      sort: { fields: [publishedAt], order: DESC }
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
          tech
        }
      }
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

// export const pageQuery = graphql`
//   {
//     hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
//       edges {
//         node {
//           frontmatter {
//             title
//             name
//             subtitle
//             contactText
//           }
//           html
//         }
//       }
//     }
//     about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
//       edges {
//         node {
//           frontmatter {
//             title
//             avatar {
//               childImageSharp {
//                 fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
//                   ...GatsbyImageSharpFluid_withWebp_tracedSVG
//                 }
//               }
//             }
//             skills
//           }
//           html
//         }
//       }
//     }
//     jobs: allMarkdownRemark(
//       filter: { fileAbsolutePath: { regex: "/jobs/" } }
//       sort: { fields: [frontmatter___date], order: DESC }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             title
//             company
//             location
//             range
//             url
//           }
//           html
//         }
//       }
//     }
//     featured: allMarkdownRemark(
//       filter: { fileAbsolutePath: { regex: "/featured/" } }
//       sort: { fields: [frontmatter___date], order: DESC }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             title
//             cover {
//               childImageSharp {
//                 fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
//                   ...GatsbyImageSharpFluid_withWebp_tracedSVG
//                 }
//               }
//             }
//             tech
//             github
//             external
//           }
//           html
//         }
//       }
//     }
//     projects: allMarkdownRemark(
//       filter: {
//         fileAbsolutePath: { regex: "/projects/" }
//         frontmatter: { showInProjects: { ne: false } }
//       }
//       sort: { fields: [frontmatter___date], order: DESC }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             title
//             tech
//             github
//             external
//           }
//           html
//         }
//       }
//     }
//     contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
//       edges {
//         node {
//           frontmatter {
//             title
//           }
//           html
//         }
//       }
//     }
//   }
// `;
