import React, { useRef, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import { sr } from '@utils';
import { srConfig } from '@config';
import { Layout } from '@components';
import { IconGitHub, IconExternal } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Main } from '@styles';
import PropTypes from 'prop-types';

const { colors, fonts, fontSizes } = theme;

const StyledTableContainer = styled.div`
    margin: 100px -20px;
    ${media.tablet`
        margin: 100px -10px;
    `};
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
        ${media.tablet`
            display: none;
        `};
    }

    tbody tr {
        transition: ${theme.transition};

        &:hover,
        &:focus {
            background-color: ${colors.lightNavy};
        }
    }

    th,
    td {
        cursor: default;
        line-height: 1.5;
        padding: 10px 20px;
        ${media.tablet`
            padding: 10px;
        `};
    }

    th {
        text-align: left;
    }

    td {
        &.year {
            width: 10%;
            ${media.tablet`
                font-size: ${fontSizes.sm};
            `};
        }

        &.title {
            padding-top: 15px;
            color: ${colors.lightestSlate};
            font-size: ${fontSizes.xl};
            font-weight: 700;
        }

        &.company {
            width: 15%;
            padding-top: 15px;
            font-size: ${fontSizes.lg};
        }

        &.tech {
            font-size: ${fontSizes.xs};
            font-family: ${fonts.SFMono};
        }

        &.links {
            span {
                ${mixins.flexBetween};

                a + a {
                    margin-left: 10px;
                }

                svg {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
`;

const StyledTechListLink = styled(Link)`
    ${mixins.inlineLink};

    &::after {
        bottom: 0.2em;
    }
`;

function ArchivePage({ location, data }) {
    const projects = data.projects.edges;
    const archiveTitle = data.titles.edges[0].node.title;
    const archiveSubtitle = data.titles.edges[0].node.subtitle;

    const revealBigTitle = useRef(null);
    const revealSubTitle = useRef(null);
    const revealTable = useRef(null);
    const revealItems = useRef(null);
    // const revealProjects = useRef([]);
    useEffect(() => {
        // sr.clean(revealBigTitle.current);
        sr.reveal(revealBigTitle.current, srConfig(1000));
        sr.reveal(revealSubTitle.current, srConfig(1500));
        sr.reveal(revealTable.current, srConfig(2000));
        sr.reveal(revealItems.current, srConfig(2500));
        // revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 500 + 3000)));
    }, []);

    return (
        <Layout location={location}>
            <Main>
                <header>
                    <h1 className="big-title" ref={revealBigTitle}>
                        {archiveTitle}
                    </h1>
                    <p className="subtitle" ref={revealSubTitle}>
                        {archiveSubtitle}
                    </p>
                </header>

                <StyledTableContainer>
                    <StyledTable>
                        <thead ref={revealTable}>
                            <tr>
                                <th>Year</th>
                                <th>Title</th>
                                <th className="hide-on-mobile">Built with</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody ref={revealItems}>
                            {projects.length > 0 &&
                                projects.map(({ node }, i) => {
                                    const {
                                        slug,
                                        publishedAt,
                                        githubLink,
                                        externalLink,
                                        title,
                                        tags,
                                    } = node;
                                    return (
                                        <tr
                                            key={slug.current}
                                            // eslint-disable-next-line no-return-assign
                                            // ref={(el) => (revealProjects.current[i] = el)}
                                        >
                                            <td className="overline year">{`${new Date(publishedAt).getFullYear()}`}</td>

                                            <td className="title">
                                                <Link to={`/project/${slug.current}/`}>
                                                    {title}
                                                </Link>
                                            </td>

                                            <td className="tech hide-on-mobile">
                                                {tags.length > 0 &&
                                                    tags.map((tag) => (
                                                        <span key={tag.slug.current}>
                                                            <span>
                                                                <StyledTechListLink
                                                                    to={`/tags/${tag.slug.current}`}
                                                                >
                                                                    #{tag.title}
                                                                </StyledTechListLink>
                                                            </span>
                                                            {i !== tags.length - 1 && (
                                                                <span>&nbsp;&middot;&nbsp;</span>
                                                            )}
                                                        </span>
                                                    ))}
                                            </td>

                                            <td className="links">
                                                <span>
                                                    {githubLink ? (
                                                        <a
                                                            href={githubLink}
                                                            target="_blank"
                                                            rel="nofollow noopener noreferrer"
                                                            aria-label="GitHub Link"
                                                        >
                                                            <IconGitHub />
                                                        </a>
                                                    ) : (
                                                        <span aria-label="Empty">—</span>
                                                    )}
                                                    {externalLink ? (
                                                        <a
                                                            href={externalLink}
                                                            target="_blank"
                                                            rel="nofollow noopener noreferrer"
                                                            aria-label="External Link"
                                                        >
                                                            <IconExternal />
                                                        </a>
                                                    ) : (
                                                        <span aria-label="Empty">—</span>
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </StyledTable>
                </StyledTableContainer>
            </Main>
        </Layout>
    );
}

ArchivePage.propTypes = {
    data: PropTypes.object,
    location: PropTypes.object,
};

export default ArchivePage;

export { Head } from '@components';

export const pageQuery = graphql`
    {
        projects: allSanitySampleProject(
            sort: { publishedAt: DESC }
            filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
        ) {
            edges {
                node {
                    title
                    githubLink
                    externalLink
                    slug {
                        current
                    }
                    publishedAt
                    tags {
                        title
                        slug {
                            current
                        }
                    }
                }
            }
        }
        titles: allSanityArchive {
            edges {
                node {
                    subtitle
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
