import React from 'react';
import { Link, graphql } from 'gatsby';
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

function TagsPage({ data, location }) {
    const tagEdges = data.tags.edges;
    const projectEdges = data.projectCount.edges;

    var tagsHolder = [];
    projectEdges.map(({ node }) => node.tags.map(({ title }) => tagsHolder.push(title)));
    var counts = {};
    for (let i = 0; i < tagsHolder.length; i += 1) {
        counts[tagsHolder[i]] = 1 + (counts[tagsHolder[i]] || 0);
    }

    const filteredTags = tagEdges.filter(({ node }) => counts[node.title] > 0);

    return (
        <Layout location={location}>
            <SEO siteTitle="Tags" sitePath="/tags" />

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
    }
`;
