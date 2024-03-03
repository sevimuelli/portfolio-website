import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact } from '@components';
import styled from 'styled-components';
import { Main } from '@styles';

const StyledMainContainer = styled(Main)`
    counter-reset: section;
`;

function IndexPage({ location, data, errors }) {
    if (errors) {
        return (
            <Layout location={location}>
                <div>
                    <h1>GraphQL Error</h1>
                    {errors.map((error) => (
                        <pre key={error.message}>{error.message}</pre>
                    ))}
                </div>
            </Layout>
        );
    }

    const { featuredTitle, otherProjectsTitle, _rawFrontDescription, frontImage } =
        data.projectsOverview.edges[0].node;

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
                    <Projects projects={data.projects.edges} sectionTitle={otherProjectsTitle} />
                )}
                <Contact data={data.contact.edges} />
            </StyledMainContainer>
        </Layout>
    );
}

IndexPage.propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    errors: PropTypes.object,
};

export default IndexPage;

export { Head } from '@components';

export const query = graphql`
    query IndexPageQuery {
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
                                gatsbyImageData(layout: FULL_WIDTH)
                            }
                        }
                    }
                    title
                    _rawDescription
                    photo {
                        alt
                        asset {
                            gatsbyImageData(layout: FULL_WIDTH)
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
                    featuredTitle
                    otherProjectsTitle
                    _rawFrontDescription
                    frontImage {
                        asset {
                            gatsbyImageData(layout: FULL_WIDTH)
                        }
                        alt
                    }
                }
            }
        }
        featured: allSanitySampleProject(
            limit: 4
            sort: { order: ASC }
            filter: {
                slug: { current: { ne: null } }
                publishedAt: { ne: null }
                featured: { eq: true }
            }
        ) {
            edges {
                node {
                    slug {
                        current
                    }
                    title
                    mainImage {
                        asset {
                            gatsbyImageData(layout: FULL_WIDTH)
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
            sort: { order: ASC }
            filter: {
                slug: { current: { ne: null } }
                publishedAt: { ne: null }
                featured: { ne: true }
            }
        ) {
            edges {
                node {
                    title
                    tech
                    githubLink
                    externalLink
                    mainImage {
                        asset {
                            gatsbyImageData(layout: FULL_WIDTH)
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
        metadata: site {
            siteMetadata {
                title
                siteUrl
                description
            }
        }
    }
`;
