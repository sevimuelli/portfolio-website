import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { Layout, SEO } from '@components';
import styled from 'styled-components';
import { theme, mixins, Main } from '@styles';

const { colors, fontSizes } = theme;

const StyledTagsContainer = styled(Main)`
    max-width: 1000px;

    a {
        ${mixins.inlineLink};
    }

    h1 {
        ${mixins.flexBetween};
        margin-bottom: 50px;

        a {
            font-size: ${fontSizes.lg};
            font-weight: 400;
        }
    }

    ul {
        li {
            font-size: 24px;

            h2 {
                font-size: inherit;
                margin: 0;

                a {
                    color: ${colors.lightSlate};
                }
            }

            .subtitle {
                color: ${colors.slate};
                font-size: ${fontSizes.sm};

                .tag {
                    margin-right: 10px;
                }
            }
        }
    }
`;

function TagTemplate({ pageContext, data, location }) {
    const { tag, slug } = pageContext;
    const { edges } = data.allSanitySampleProject;

    return (
        <Layout location={location}>
            <SEO siteTitle={`#${tag}`} sitePath={`/tags/${slug}`} />
            <StyledTagsContainer>
                <span className="breadcrumb">
                    <span className="arrow">&larr;</span>
                    <Link to="/tags/">View all tags</Link>
                </span>

                <h1>
                    <span>#{tag}</span>
                </h1>

                <ul className="fancy-list">
                    {edges.map(({ node }) => {
                        const { title, publishedAt, tags } = node;
                        const localSlug = node.slug;
                        return (
                            <li key={localSlug.current}>
                                <h2>
                                    <Link to={`/project/${localSlug.current}/`}>{title}</Link>
                                </h2>
                                <p className="subtitle">
                                    <time>
                                        {new Date(publishedAt).toLocaleDateString('en-GB', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                    <span>&nbsp;&mdash;&nbsp;</span>
                                    {tags &&
                                        tags.length > 0 &&
                                        tags.map((singleTag, i) => (
                                            <Link
                                                key={i}
                                                to={`/tags/${singleTag.slug.current}/`}
                                                className="tag"
                                            >
                                                #{singleTag.title}
                                            </Link>
                                        ))}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </StyledTagsContainer>
        </Layout>
    );
}

TagTemplate.propTypes = {
    pageContext: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default TagTemplate;

export const pageQuery = graphql`
    query ($tag: String!) {
        allSanitySampleProject(
            sort: { publishedAt: DESC }
            filter: { tags: { elemMatch: { title: { in: [$tag] } } } }
            limit: 2000
        ) {
            edges {
                node {
                    title
                    tags {
                        title
                        slug {
                            current
                        }
                    }
                    publishedAt
                    slug {
                        current
                    }
                }
            }
        }
    }
`;
