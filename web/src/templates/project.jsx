import { graphql } from 'gatsby';
import { Layout, SEO } from '@components';
import styled from 'styled-components';
import { Main } from '@styles';
import Project from '../components/project';

const StyledContainer = styled(Main)`
    max-width: 1000px;
`;

const ProjectTemplate = ({ data, location }) => {
    const project = data && data.sampleProject;
    return (
        <Layout location={location}>
            <SEO
                siteTitle={data.sampleProject.title}
                sitePath={`/project/${data.sampleProject.slug.current}`}
            >
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
            </SEO>
            <StyledContainer>{project && <Project data={project} />}</StyledContainer>
        </Layout>
    );
};

export default ProjectTemplate;

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
