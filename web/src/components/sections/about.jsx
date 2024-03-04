import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { sr } from '@utils';
import { srConfig, github } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import { PortableTextBlock } from '@components';
// import { buildImageObj } from '../../utils/helpers';
// import imageUrlFor from '@utils';

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

    &::before {
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

const StyledAvatar = styled(GatsbyImage)`
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
    background-color: rgba(100, 255, 218, 1);
    margin-left: -20px;
    transition: ${theme.transition};

    &:hover,
    &:focus {
        background-color: ${colors.greenFadeOff};

        &:after {
            top: 15px;
            left: 15px;
        }
        ${StyledAvatar} {
            filter: none;
        }
    }

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

const SkillBigPicture = styled(GatsbyImage)`
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    width: 100%;
    filter: grayscale(100%) contrast(1);
    background-color: ${colors.navy};
    transition: ${theme.transition};
    mix-blend-mode: multiply;
    border-radius: 7px;
`;

const SkillBigPictureContainter = styled.div`
    width: 11%;
    justify-self: start;
    transition: ${theme.transition};
    background-color: rgba(100, 255, 218, 1);
    z-index: -1;
    border-radius: 7px;
`;

const SkillBigContainer = styled.div`
    display: flex;
    align-items: center;
    animation-play-state: paused;

    &:hover,
    &:focus {
        ${SkillBigPicture} {
            filter: none;
        }
        ${SkillBigPictureContainter} {
            background-color: ${colors.greenFadeOff};
        }
    }
`;

const SkillBigDetail = styled.div`
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
`;

const SkillBigBarIntern = styled.div`
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 10px;
    background-image: linear-gradient(to right, ${colors.navy}, ${colors.green});
    ${mixins.barAnimations}
`;

const startAnimation = ({ id }) => {
    const el = document.getElementById(`skill_${id}`);
    el.style.animationPlayState = 'running';
};

function About({ data }) {
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
            }),
        );
    }, []);

    return (
        <StyledContainer id="about">
            <Heading ref={revealTitle}>{title}</Heading>
            <StyledFlexContainer ref={revealFlexContainer}>
                <StyledContent>
                    {_rawDescription && <PortableTextBlock value={_rawDescription || []} />}
                    <SkillsContainer>
                        {otherSkills &&
                            otherSkills.map((skill) => <Skill key={skill}>{skill}</Skill>)}
                    </SkillsContainer>
                </StyledContent>
                <StyledPic>
                    <StyledAvatarLink href={github}>
                        <StyledAvatar image={photo.asset.gatsbyImageData} alt={photo.alt} />
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

                        /* const src = imageUrlFor(buildImageObj(skill.icon)).height(70).url(); */

                        return (
                            <SkillBigContainer
                                key={skill.title}
                                // eslint-disable-next-line no-return-assign
                                ref={(el) => (revealSkills.current[i] = el)}
                            >
                                <SkillBigPictureContainter>
                                    <SkillBigPicture
                                        image={skill.icon.asset.gatsbyImageData}
                                        alt={skill.title}
                                    />
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
}

About.propTypes = {
    data: PropTypes.array.isRequired,
};

export default About;
