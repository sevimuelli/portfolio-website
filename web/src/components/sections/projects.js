import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { IconGitHub, IconExternal, IconFolder } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Button } from '@styles';
const { colors, fontSizes, fonts } = theme;

import BlockContent from '../block-content';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';

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
  &:after {
    bottom: 0.1em;
  }
`;
const StyledGrid = styled.div`
  margin-top: 50px;
  width: 100%;

  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    ${'' /* grid-template-column: 1fr 1fr 1fr; */}
    grid-gap: 15px;
    position: relative;
    ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));`};
  }
`;

const StyledImageContainer = styled.div`
  background-color: ${colors.green};
  transition: ${theme.transition};
`;

const StyledImage = styled.img`
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1) brightness(90%);
  transition: ${theme.transition};
`;

const StyledProjectInner = styled(Link)`
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
      mix-blend-mode: unset;
      filter: none;
    }
  }
`;
const StyledProjectHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 30px;
`;
const StyledFolder = styled.div`
  color: ${colors.green};
  svg {
    width: 40px;
    height: 40px;
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
  ${'' /* margin-right: -10px; */}
  color: ${colors.lightSlate};
  align-self: flex-end;
`;
const StyledIconLink = styled.a`
  position: relative;
  ${'' /* top: 10px; */}
  padding: 5px 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledMoreButton = styled(Button)`
  margin: 100px auto 0;
`;

const Projects = ({ projects, sectionTitle }) => {
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
  // const projects = data.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;
  const moreProjects = projects.length > GRID_LIMIT;
  console.log('Project length: ' + projects.length);

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
                external,
                externalLink,
                github,
                githubLink,
                tech,
                tags
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
                    ref={el => (revealProjects.current[i] = el)}
                    tabIndex="0"
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`
                    }}
                  >
                    <StyledProjectInner to={`/project/${slug.current}`}>
                      <header>
                        {/* <StyledProjectHeader>
                          <StyledFolder>
                            <IconFolder />
                          </StyledFolder>
                        </StyledProjectHeader> */}
                        <StyledImageContainer>
                          <StyledImage
                            src={imageUrlFor(buildImageObj(mainImage))
                              .width(600)
                              .height(Math.floor((9 / 16) * 600))
                              .url()}
                            alt={mainImage.alt}
                          />
                        </StyledImageContainer>

                        <StyledProjectName>{title}</StyledProjectName>
                        <StyledProjectDescription>
                          {_rawExcerpt && <BlockContent blocks={_rawExcerpt || []} />}
                        </StyledProjectDescription>
                      </header>
                      <StyledFooter>
                        <StyledTechList>
                          {tags.map((tag, i) => (
                            <li key={i}>
                              <StyledTechListLink key={i} to={`/tags/${tag.slug.current}`}>
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
};

Projects.propTypes = {
  data: PropTypes.array.isRequired
};

export default Projects;