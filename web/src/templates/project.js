import React from 'react';
import { graphql } from 'gatsby';
import Project from '../components/project';

import { Layout } from '@components';
import styled from 'styled-components';
import { Main, theme } from '@styles';
import { Helmet } from 'react-helmet';

const StyledContainer = styled(Main)`
  max-width: 1000px;
`;

const ProjectTemplate = ({ data, location }) => {
  const project = data && data.sampleProject;
  return (
    <Layout location={location}>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Helmet>
      <StyledContainer>{project && <Project data={project} />}</StyledContainer>
    </Layout>
  );
};

export default ProjectTemplate;

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    sampleProject: sanitySampleProject(id: { eq: $id }) {
      aspectRatioImgGal
      id
      tech
      publishedAt
      githubLink
      externalLink
      categories {
        _id
        title
      }
      relatedProjects {
        title
        slug {
          current
        }
      }
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
          metadata {
            palette {
              vibrant {
                foreground
                background
              }
              dominant {
                foreground
                background
              }
            }
          }
        }
        alt
        caption
      }
      title
      slug {
        current
      }
      _rawBody
      _rawIntroText
      imgGallery {
        asset {
          _id
          metadata {
            palette {
              vibrant {
                foreground
                background
              }
              dominant {
                foreground
                background
              }
            }
          }
        }
        caption
        alt
      }
      tags {
        title
        slug {
          current
        }
      }
    }
  }
`;
