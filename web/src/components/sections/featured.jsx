import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { sr } from '@utils';
import { srConfig } from '@config';
import { IconGitHub, IconExternal } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import { PortableTextBlock } from '@components';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
    ${mixins.flexCenter};
    flex-direction: column;
    align-items: flex-start;
`;

const StyledFlexContainer = styled.div`
    ${mixins.flexBetween};
    align-items: flex-start;
    width: 100%;
    margin-bottom: 150px;
    ${media.tablet`
        flex-direction: column;
    `};
`;

const StyledIntroContent = styled.div`
    width: 50%;
    max-width: 480px;
    ${media.tablet`width: 100%;`};

    a {
        ${mixins.inlineLink};
    }
`;

const StyledPic = styled.div`
    position: relative;
    width: 50%;
    max-width: 400px;
    margin-left: 60px;
    ${media.tablet`margin: 20px auto 50px; order: -1;`};
    ${media.phablet`width: 70%;`};

    a {
        &:focus {
            outline: 0;
        }
    }
`;

const StyledAvatar = styled(GatsbyImage)`
    position: relative;
    mix-blend-mode: multiply;
    filter: grayscale(100%) contrast(1);
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
`;

const StyledAvatarLink = styled.div`
    ${mixins.boxShadow};
    width: 100%;
    position: relative;
    border-radius: ${theme.borderRadius};
    background-color: ${colors.green};
    margin-left: -20px;
    transition: ${theme.transition};

    &::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: ${theme.borderRadius};
        transition: ${theme.transition};
    }

    &::after {
        border-right: 2px solid ${colors.green};
        border-bottom: 2px solid ${colors.green};
        top: 12px;
        left: 12px;
        z-index: -1;
    }

    &:hover,
    &:focus {
        background-color: ${colors.greenFadeOff};

        &::after {
            top: 17px;
            left: 17px;
        }
        ${StyledAvatar} {
            filter: none;
        }
    }
`;

const StyledContent = styled.div`
    height: 100%;
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    ${media.thone`
        grid-column: 1 / -1;
        padding: 20px 40px 30px;
        z-index: 5;
    `};
    ${media.phablet`padding: 20px 25px 20px;`};
`;

const StyledLabel = styled.h4`
    font-size: ${fontSizes.smish};
    font-weight: normal;
    color: ${colors.green};
    font-family: ${fonts.SFMono};
    margin-top: 10px;
    padding-top: 0;
    ${media.thone`margin-top: 0px;`};
`;

const StyledProjectName = styled.h5`
    font-size: 28px;
    margin: 0 0 20px;
    color: ${colors.lightestSlate};
    ${media.tablet`font-size: 24px;`};
    ${media.thone`
        color: ${colors.white};
        margin-bottom: 0px;
    `};

    a {
        ${media.tablet`display: block;`};
    }
`;

const StyledDescription = styled.div`
    ${mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    background-color: ${colors.lightNavy};
    color: ${colors.lightSlate};
    font-size: ${fontSizes.lg};
    ${media.thone`font-size: 17px;`};
    ${media.phablet`font-size: 16px;`};
    border-radius: ${theme.borderRadius};
    ${media.thone`
    background-color: transparent;
    padding: 10px 0;
    box-shadow: none;
    &:hover {
        box-shadow: none;
    }
    `};

    p {
        margin: 0;
    }

    a {
        ${mixins.inlineLink};
    }
`;

const StyledTechList = styled.ul`
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 25px 0 0px;
    list-style: none;

    li {
        font-family: ${fonts.SFMono};
        font-size: ${fontSizes.smish};
        color: ${colors.slate};
        margin-bottom: 7px;
        margin-right: ${theme.margin};
        white-space: nowrap;

        &:last-of-type {
            margin-right: 0;
        }
        ${media.thone`
            color: ${colors.lightestSlate};
            margin-right: 10px;
        `};
    }
    ${media.thone`
            position: absolute;
            bottom: 45px;
        `};
`;

const StyledTechListLink = styled(Link)`
    ${mixins.inlineLink};

    &::after {
        bottom: 0.05em;
    }
`;

const StyledLinkWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 0px;
    margin-left: -10px;
    color: ${colors.lightestSlate};

    a {
        padding: 10px;

        svg {
            width: 22px;
            height: 22px;
        }
    }
    ${media.thone`
            position: absolute;
            bottom: 8px;
        `};
`;

const StyledFeaturedImg = styled(GatsbyImage)`
    aspect-ratio: 4/3;
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
    border-radius: ${theme.borderRadius};
    position: relative;
    mix-blend-mode: multiply;
    filter: grayscale(100%) contrast(1) brightness(90%);
    transition: ${theme.transition};
    ${media.tablet`
        aspect-ratio: 1;
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(80%);
    `};
    ${media.thone`aspect-ratio: 4/3;`};
`;

const StyledImgContainer = styled(Link)`
    ${mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    background-color: ${colors.green};
    border-radius: ${theme.radius + 1}px;
    transition: ${theme.transition};
    ${media.tablet`height: auto;`};
    ${media.thone`
        grid-column: 1 / -1;
        opacity: 0.25;
    `};

    &:hover,
    &:focus {
        background: ${colors.greenFadeOff};
        &:before,
        ${StyledFeaturedImg} {
            background: ${colors.greenFadeOff};
            filter: none;
        }
    }

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: ${theme.transition};
        background-color: ${colors.navy};
        mix-blend-mode: screen;
    }
`;

const StyledProject = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;
    margin-bottom: 100px;
    ${media.thone`
        margin-bottom: 70px;
    `};

    &:last-of-type {
        margin-bottom: 0;
    }

    &:nth-of-type(odd) {
        ${StyledContent} {
            grid-column: 7 / -1;
            text-align: right;
            ${media.thone`
                grid-column: 1 / -1;
                padding:20px 40px 30px;
            `};
            ${media.phablet`padding: 20px 25px 20px;`};
        }
        ${StyledTechList} {
            justify-content: flex-end;

            li {
                margin-left: ${theme.margin};
                margin-right: 0;
            }
        }
        ${StyledLinkWrapper} {
            justify-content: flex-end;
            margin-left: 0;
            margin-right: -10px;
        }
        ${StyledImgContainer} {
            grid-column: 1 / 8;
            /* ${media.tablet`height: auto;`}; */
            ${media.thone`
                grid-column: 1 / -1;
                opacity: 0.25;
            `};
        }
    }
`;

function Featured({ featuredProjects, SectionTitle, _rawFrontDescription, frontImage }) {
    const revealTitle = useRef(null);
    const revealFlexContainer = useRef(null);
    const revealProjects = useRef([]);
    useLayoutEffect(() => {
        sr.reveal(revealTitle.current, srConfig());
        sr.reveal(revealFlexContainer.current, srConfig());
        revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
    }, []);

    return (
        <StyledContainer id="projects">
            <Heading ref={revealTitle}>{SectionTitle}</Heading>
            <StyledFlexContainer ref={revealFlexContainer}>
                <StyledIntroContent>
                    {_rawFrontDescription && (
                        <PortableTextBlock value={_rawFrontDescription || []} />
                    )}
                </StyledIntroContent>
                <StyledPic>
                    <StyledAvatarLink>
                        <StyledAvatar
                            image={frontImage.asset.gatsbyImageData}
                            alt={frontImage.alt}
                        />
                    </StyledAvatarLink>
                </StyledPic>
            </StyledFlexContainer>

            <div>
                {featuredProjects &&
                    featuredProjects.map(({ node }, i) => {
                        const {
                            slug,
                            title,
                            mainImage,
                            _rawExcerpt,
                            external,
                            externalLink,
                            githubLink,
                            tags,
                        } = node;

                        return (
                            <StyledProject
                                key={slug.current}
                                // eslint-disable-next-line no-return-assign
                                ref={(el) => (revealProjects.current[i] = el)}
                            >
                                <StyledContent>
                                    <StyledLabel>Featured Project</StyledLabel>
                                    <StyledProjectName>
                                        {external ? (
                                            <a
                                                href={externalLink}
                                                target="_blank"
                                                rel="nofollow noopener noreferrer"
                                                aria-label="External Link"
                                            >
                                                {title}
                                            </a>
                                        ) : (
                                            <Link to={`/project/${slug.current}/`}>{title}</Link>
                                        )}
                                    </StyledProjectName>
                                    <StyledDescription>
                                        {_rawExcerpt && (
                                            <PortableTextBlock value={_rawExcerpt || []} />
                                        )}
                                    </StyledDescription>
                                    {tags && (
                                        <StyledTechList>
                                            {tags.map((tag) => (
                                                <li key={tag.slug.current}>
                                                    <StyledTechListLink
                                                        to={`/tags/${tag.slug.current}`}
                                                    >
                                                        #{tag.title}
                                                    </StyledTechListLink>
                                                </li>
                                            ))}
                                        </StyledTechList>
                                    )}
                                    <StyledLinkWrapper>
                                        {githubLink && (
                                            <a
                                                href={githubLink}
                                                target="_blank"
                                                rel="nofollow noopener noreferrer"
                                                aria-label="GitHub Link"
                                            >
                                                <IconGitHub />
                                            </a>
                                        )}
                                        {externalLink && (
                                            <a
                                                href={externalLink}
                                                target="_blank"
                                                rel="nofollow noopener noreferrer"
                                                aria-label="External Link"
                                            >
                                                <IconExternal />
                                            </a>
                                        )}
                                    </StyledLinkWrapper>
                                </StyledContent>
                                <StyledImgContainer to={`/project/${slug.current}`}>
                                    <StyledFeaturedImg
                                        image={mainImage.asset.gatsbyImageData}
                                        alt={title}
                                    />
                                </StyledImgContainer>
                            </StyledProject>
                        );
                    })}
            </div>
        </StyledContainer>
    );
}

Featured.propTypes = {
    featuredProjects: PropTypes.array.isRequired,
    SectionTitle: PropTypes.string.isRequired,
    _rawFrontDescription: PropTypes.array.isRequired,
    frontImage: PropTypes.object.isRequired,
};
export default Featured;
