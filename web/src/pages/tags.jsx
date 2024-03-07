import React, { useRef, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import { Layout } from '@components';
import styled from 'styled-components';
import { theme, mixins, Main } from '@styles';
import PropTypes from 'prop-types';
import { sr } from '@utils';
import { srConfig } from '@config';

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

    const revealLink = useRef(null);
    const revealTitle = useRef(null);
    const revealTags = useRef([]);
    useEffect(() => {
        sr.reveal(revealLink.current, srConfig(1000));
        sr.reveal(revealTitle.current, srConfig(1500));
        revealTags.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100 + 2000)));
    }, []);

    return (
        <Layout location={location}>
            <StyledTagsContainer>
                <span className="breadcrumb" ref={revealLink}>
                    <span className="arrow">&larr;</span>
                    <Link to="/archive/">Back to archive</Link>
                </span>

                <h1 ref={revealTitle}>Tags</h1>
                <ul className="fancy-list">
                    {filteredTags.map(({ node }, i) => (
                        // eslint-disable-next-line no-return-assign
                        <li key={node.title} ref={(el) => (revealTags.current[i] = el)}>
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
