import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import sr from '@utils/sr';
import { srConfig, github } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import { BlockContent } from '@components';
import { buildImageObj } from '../../utils/helpers';
import { imageUrlFor } from '../../utils/image-url';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`
    flex-direction: column;
  `};
`;
const StyledContent = styled.div`
  width: 60%;
  max-width: 480px;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;

const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  overflow: hidden;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;
`;

const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.slate};
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${colors.green};
    font-size: ${fontSizes.sm};
    line-height: 12px;
  }
`;

const StyledPic = styled.div`
  position: relative;
  width: 40%;
  max-width: 300px;
  margin-left: 60px;
  ${media.tablet`margin: 20px auto 50px; order: -1;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;
const StyledAvatar = styled(Img)`
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1);
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
`;
const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  background-color: ${colors.green};
  margin-left: -20px;
  &:hover,
  &:focus {
    background: transparent;
    &:after {
      top: 15px;
      left: 15px;
    }
    ${StyledAvatar} {
      filter: none;
      mix-blend-mode: normal;
    }
  }
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
  }
  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.navy};
    mix-blend-mode: screen;
  }
  &:after {
    border: 2px solid ${colors.green};
    top: 20px;
    left: 20px;
    z-index: -1;
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-gap: 3rem;
  margin: 7rem 5%;
  ${media.desktop`
    grid-gap: 3rem 1.5rem;
    margin: 80px 10px;
  `};
  ${media.tablet`
    grid-template: 1fr / 1fr;
    grid-gap: 3.5rem;
    margin: 80px 30px;
  `};
`;

const SkillBigPicture = styled(Img)`
  ${'' /* display: block;
  height: 50px;
  box-sizing: border-box;
  object-fit: contain; */}
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  width: 100%;
  filter: grayscale(100%) contrast(1);
  background-color: #0b2040;
  transition: ${theme.transition};
  mix-blend-mode: multiply;
`;

const SkillBigContainer = styled.div`
  display: flex;
  align-items: center;
  animation-play-state: paused;
  ${'' /* height: 200px; */}
  ${'' /* justify-content: space-between; */}
  &:hover,
  &:focus {
    ${SkillBigPicture} {
      mix-blend-mode: normal;
      filter: none;
      ${'' /* background-color: none; */}
    }
  }
`;

const SkillBigPictureContainter = styled.div`
  ${'' /* align-self: center; */}
  width: 11%;
  justify-self: start;
  background-color: ${colors.green};
  ${'' /* backdrop-filter: opacity(30%); */}
  z-index: -1;
`;

const SkillBigDetail = styled.div`
  ${'' /* width: 80%; */}
  flex-grow: 1;
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  margin-left: 1.2rem;
`;

const SkillBigMeta = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
`;

const SkillBigTitle = styled.h3`
  line-height: 1;
  margin-bottom: 0;
`;

const SkillBigProcent = styled.h3`
  line-height: 1;
  margin-bottom: 0;
`;

const SkillBigBar = styled.div`
  width: 100%;
  height: 1rem;
  background: ${colors.navy};
  position: relative;
  border-radius: 10px;

  ${'' /* &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 10px;
    width: 80%;
    background-image: linear-gradient(to right, ${colors.navy}, ${colors.green});
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    animation-name: ratio90;
  } */}
`;

const SkillBigBarIntern = styled.div`
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 10px;
  ${'' /* width: 80%; */}
  background-image: linear-gradient(to right, ${colors.navy}, ${colors.green});
  ${
    '' /* animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running; */
  }
  ${'' /* animation-name: ratio; */}

  ${mixins.barAnimations}
`;

const startAnimation = ({ id }) => {
  const el = document.getElementById(`skill_${id}`);
  el.style.animationPlayState = 'running';
};

const About = ({ data }) => {
  const { skills, otherSkills, title, _rawDescription, photo } = data[0].node;
  const revealTitle = useRef(null);
  const revealFlexContainer = useRef(null);
  const revealSkills = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealFlexContainer.current, srConfig());
    revealSkills.current.forEach((ref, i) =>
      sr.reveal(ref, {
        ...srConfig(i * 100),
        afterReveal() {
          return startAnimation({ id: i });
        },
      })
    );
  }, []);

  return (
    <StyledContainer id="about">
      <Heading ref={revealTitle}>{title}</Heading>
      <StyledFlexContainer ref={revealFlexContainer}>
        <StyledContent>
          {_rawDescription && <BlockContent blocks={_rawDescription || []} />}
          <SkillsContainer>
            {otherSkills && otherSkills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
          </SkillsContainer>
        </StyledContent>
        <StyledPic>
          <StyledAvatarLink href={github}>
            <StyledAvatar fluid={photo.asset.fluid} alt={photo.alt} />
          </StyledAvatarLink>
        </StyledPic>
      </StyledFlexContainer>
      <StyledGridContainer>
        {skills &&
          skills.map((skill, i) => {
            const barLength = {
              animation: `ratio${skill.level}0 3s 0.3s forwards`,
              animationPlayState: 'paused',
            };
            const src = imageUrlFor(buildImageObj(skill.icon)).height(70).url();

            return (
              <SkillBigContainer key={i} ref={(el) => (revealSkills.current[i] = el)}>
                <SkillBigPictureContainter>
                  <SkillBigPicture fluid={skill.icon.asset.fluid} alt={skill.title} />
                </SkillBigPictureContainter>
                <SkillBigDetail>
                  <SkillBigMeta>
                    <SkillBigTitle>{skill.title}</SkillBigTitle>
                    <SkillBigProcent>{`${skill.level}0%`}</SkillBigProcent>
                  </SkillBigMeta>
                  <SkillBigBar>
                    <SkillBigBarIntern id={`skill_${i}`} style={barLength} />
                  </SkillBigBar>
                </SkillBigDetail>
              </SkillBigContainer>
            );
          })}
      </StyledGridContainer>
    </StyledContainer>
  );
};

About.propTypes = {
  data: PropTypes.array.isRequired,
};

export default About;
