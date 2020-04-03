import React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/graphql-error-list';
import Project from '../components/project';
import SEO from '../components/seo';

import { Layout } from '@components';
import styled from 'styled-components';
import { Main, theme } from '@styles';

const StyledContainer = styled(Main)`
  max-width: 1000px;
`;

const ProjectTemplate = ({ data, location, errors }) => {
  const project = data && data.sampleProject;
  return (
    <Layout location={location}>
      {errors && <SEO title="GraphQL Error" />}
      {project && <SEO title={project.title || 'Untitled'} />}

      <StyledContainer>
        {errors && <GraphQLErrorList errors={errors} />}
        {project && <Project data={project} />}
      </StyledContainer>
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
