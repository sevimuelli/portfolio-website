import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { sr } from '@utils';
import { srConfig } from '@config';
import { IconGitHub, IconExternal } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Button } from '@styles';
import { PortableTextBlock } from '@components';
import PropTypes from 'prop-types';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
    ${mixins.flexCenter};
    flex-direction: column;
    align-items: flex-start;
`;

const StyledTitle = styled.h4`
    margin: 0 auto;
    font-size: ${fontSizes.h3};
    ${media.tablet`font-size: 24px;`};

    a {
        display: block;
    }
`;

const StyledArchiveLink = styled(Link)`
    ${mixins.inlineLink};
    text-align: center;
    margin: 0 auto;
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};

    &::after {
        bottom: 0.1em;
    }
`;

const StyledGrid = styled.div`
    margin-top: 50px;
    width: 100%;

    .projects {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        grid-gap: 15px;
        position: relative;
        ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));`};
    }
`;

const StyledImageContainer = styled.div`
    transition: ${theme.transition};
    background: rgba(100, 255, 218, 1);
    position: relative;
    z-index: 1;
`;

const StyledImage = styled(GatsbyImage)`
    mix-blend-mode: multiply;

    filter: grayscale(100%) contrast(1) brightness(90%);
    transition: ${theme.transition};
`;

const StyledProjectInner = styled.div`
    ${mixins.boxShadow};
    ${mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    padding: 2rem 1.75rem;
    height: 100%;
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
    background-color: ${colors.lightNavy};
`;

const StyledProject = styled.div`
    transition: ${theme.transition};
    cursor: default;

    &:hover,
    &:focus {
        outline: 0;
        ${StyledProjectInner} {
            transform: translateY(-5px);
        }

        ${StyledImage} {
            filter: none;
        }
        ${StyledImageContainer} {
            background: rgba(100, 255, 218, 0);
        }
    }
`;

const StyledProjectName = styled.h5`
    margin: 30px 0 10px;
    font-size: ${fontSizes.xxl};
    color: ${colors.lightestSlate};
`;

const StyledProjectDescription = styled.div`
    font-size: 17px;
    color: ${colors.lightSlate};

    a {
        ${mixins.inlineLink};
    }
`;

const StyledFooter = styled.footer`
    ${mixins.flexBetween};
    align-items: center;
    width: 100%;
`;

const StyledTechList = styled.ul`
    display: flex;
    align-items: center;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 0 auto;
    list-style: none;

    li {
        font-family: ${fonts.SFMono};
        font-size: ${fontSizes.xs};
        color: ${colors.slate};
        line-height: 1.75;
        margin-right: 15px;

        &:last-of-type {
            margin-right: 0;
        }
    }
`;

const StyledTechListLink = styled(Link)`
    ${mixins.inlineLink};
`;

const StyledProjectLinks = styled.div`
    color: ${colors.lightSlate};
    align-self: flex-end;
`;

const StyledIconLink = styled.a`
    position: relative;
    padding: 5px 10px;

    svg {
        width: 20px;
        height: 20px;
    }
`;

const StyledMoreButton = styled(Button)`
    margin: 100px auto 0;
`;

function Projects({ projects, sectionTitle }) {
    const [showMore, setShowMore] = useState(false);
    const revealTitle = useRef(null);
    const revealArchiveLink = useRef(null);
    const revealProjects = useRef([]);

    useEffect(() => {
        sr.reveal(revealTitle.current, srConfig());
        sr.reveal(revealArchiveLink.current, srConfig());
        revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
    }, []);

    const GRID_LIMIT = 6;
    const firstSix = projects.slice(0, GRID_LIMIT);
    const projectsToShow = showMore ? projects : firstSix;
    const moreProjects = projects.length > GRID_LIMIT;

    return (
        <StyledContainer>
            <StyledTitle ref={revealTitle}>{sectionTitle}</StyledTitle>
            <StyledArchiveLink to="/archive" ref={revealArchiveLink}>
                view the archive
            </StyledArchiveLink>

            <StyledGrid>
                <TransitionGroup className="projects">
                    {projectsToShow &&
                        projectsToShow.map(({ node }, i) => {
                            const {
                                slug,
                                title,
                                mainImage,
                                _rawExcerpt,
                                externalLink,
                                githubLink,
                                tags,
                            } = node;
                            return (
                                <CSSTransition
                                    key={i}
                                    classNames="fadeup"
                                    timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                                    exit={false}
                                >
                                    <StyledProject
                                        key={i}
                                        // eslint-disable-next-line no-return-assign
                                        ref={(el) => (revealProjects.current[i] = el)}
                                        tabIndex="0"
                                        style={{
                                            transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                                        }}
                                    >
                                        <StyledProjectInner>
                                            <h1 hidden>{title}</h1>
                                            <Link to={`/project/${slug.current}`}>
                                                <header>
                                                    <StyledImageContainer>
                                                        <StyledImage
                                                            image={mainImage.asset.gatsbyImageData}
                                                            alt={mainImage.alt}
                                                        />
                                                    </StyledImageContainer>

                                                    <StyledProjectName>{title}</StyledProjectName>
                                                    <StyledProjectDescription>
                                                        {_rawExcerpt && (
                                                            <PortableTextBlock
                                                                value={_rawExcerpt || []}
                                                            />
                                                        )}
                                                    </StyledProjectDescription>
                                                </header>
                                            </Link>
                                            <StyledFooter>
                                                <StyledTechList>
                                                    {tags.map((tag) => (
                                                        <li key={tag.slug.current}>
                                                            <StyledTechListLink
                                                                key={tag.slug.current}
                                                                to={`/tags/${tag.slug.current}`}
                                                            >
                                                                #{tag.title}
                                                            </StyledTechListLink>
                                                        </li>
                                                    ))}
                                                </StyledTechList>
                                                <StyledProjectLinks>
                                                    {githubLink && (
                                                        <StyledIconLink
                                                            href={githubLink}
                                                            target="_blank"
                                                            rel="nofollow noopener noreferrer"
                                                            aria-label="GitHub Link"
                                                        >
                                                            <IconGitHub />
                                                        </StyledIconLink>
                                                    )}
                                                    {externalLink && (
                                                        <StyledIconLink
                                                            href={externalLink}
                                                            target="_blank"
                                                            rel="nofollow noopener noreferrer"
                                                            aria-label="External Link"
                                                        >
                                                            <IconExternal />
                                                        </StyledIconLink>
                                                    )}
                                                </StyledProjectLinks>
                                            </StyledFooter>
                                        </StyledProjectInner>
                                    </StyledProject>
                                </CSSTransition>
                            );
                        })}
                </TransitionGroup>
            </StyledGrid>

            {moreProjects && (
                <StyledMoreButton onClick={() => setShowMore(!showMore)}>
                    Show {showMore ? 'Less' : 'More'}
                </StyledMoreButton>
            )}
        </StyledContainer>
    );
}

Projects.propTypes = {
    projects: PropTypes.array.isRequired,
    sectionTitle: PropTypes.string.isRequired,
};

export default Projects;
