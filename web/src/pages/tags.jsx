import React from 'react';
import { Link, graphql } from 'gatsby';
import { Layout } from '@components';
import styled from 'styled-components';
import { theme, mixins, Main } from '@styles';
import PropTypes from 'prop-types';

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

function TagsPage({ data, location }) {
    const tagEdges = data.tags.edges;
    const projectEdges = data.projectCount.edges;

    // eslint-disable-next-line prefer-const
    let tagsHolder = [];
    projectEdges.map(({ node }) => node.tags.map(({ title }) => tagsHolder.push(title)));
    // eslint-disable-next-line prefer-const
    let counts = {};
    for (let i = 0; i < tagsHolder.length; i += 1) {
        counts[tagsHolder[i]] = 1 + (counts[tagsHolder[i]] || 0);
    }

    const filteredTags = tagEdges.filter(({ node }) => counts[node.title] > 0);

    return (
        <Layout location={location}>
            <StyledTagsContainer>
                <span className="breadcrumb">
                    <span className="arrow">&larr;</span>
                    <Link to="/archive/">Back to archive</Link>
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

export default TagsPage;

export { Head } from '@components';

export const pageQuery = graphql`
    query {
        tags: allSanityTag(sort: { title: ASC }) {
            edges {
                node {
                    title
                    slug {
                        current
                    }
                }
            }
        }
        projectCount: allSanitySampleProject(
            filter: { tags: { elemMatch: { title: { ne: "" } } } }
        ) {
            edges {
                node {
                    tags {
                        title
                    }
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

TagsPage.propTypes = {
    data: PropTypes.object,
    location: PropTypes.object,
};
