import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from '@components';
import styled from 'styled-components';
import { Main } from '@styles';
import Project from '../components/project';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledContainer = styled(Main)`
    max-width: 1000px;
`;

function ProjectTemplate({ data, location }) {
    const project = data && data.sampleProject;
    return (
        <Layout location={location}>
            <StyledContainer>{project && <Project data={project} />}</StyledContainer>
        </Layout>
    );
}

ProjectTemplate.propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default ProjectTemplate;

export { Head } from '@components';

export const query = graphql`
    query ProjectTemplateQuery($id: String!) {
        sampleProject: sanitySampleProject(id: { eq: $id }) {
            aspectRatioImgGal
            publishedAt
            githubLink
            externalLink
            relatedProjects {
                title
                slug {
                    current
                }
            }
            title
            slug {
                current
            }
            _rawBody
            _rawIntroText
            imgGallery {
                order
                asset {
                    _id
                    metadata {
                        lqip
                        dimensions {
                            aspectRatio
                        }
                        palette {
                            vibrant {
                                foreground
                                background
                            }
                        }
                    }
                    gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.3333)
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
        metadata: site {
            siteMetadata {
                title
                siteUrl
                description
            }
        }
    }
`;
