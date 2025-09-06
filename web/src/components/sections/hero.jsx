import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
import { Link } from 'gatsby';
import { PortableTextBlock } from '@components';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
    ${mixins.flexCenter};
    flex-direction: column;
    align-items: flex-start;
    min-height: 100vh;
    ${media.tablet`padding-top: 150px;`};

    div {
        width: 100%;
    }
`;

const StyledOverline = styled.h1`
    color: ${colors.green};
    margin: 0 0 20px 3px;
    font-size: ${fontSizes.md};
    font-family: ${fonts.SFMono};
    font-weight: normal;
    ${media.desktop`font-size: ${fontSizes.sm};`};
    ${media.tablet`font-size: ${fontSizes.smish};`};
`;

const StyledTitle = styled.h2`
    font-size: 80px;
    line-height: 1.1;
    margin: 0;
    ${media.desktop`font-size: 70px;`};
    ${media.tablet`font-size: 60px;`};
    ${media.phablet`font-size: 50px;`};
    ${media.phone`font-size: 40px;`};
`;

const StyledRole = styled.h2`
    font-size: 30px;
    line-height: 1.1;
    margin: 0;
    margin-bottom: 3em;
    color: ${colors.slate};
    ${media.desktop`font-size: 22px;`};
    ${media.tablet`font-size: 20px;`};
    ${media.phablet`font-size: 18px;`};
    ${media.phone`font-size: 15px;`};
`;

const StyledSubtitle = styled.h3`
    font-size: 60px;
    line-height: 1.1;
    /* color: ${colors.slate}; */
    ${media.desktop`font-size: 50px;`};
    ${media.tablet`font-size: 40px;`};
    ${media.phablet`font-size: 30px;`};
    ${media.phone`font-size: 20px;`};
`;

const StyledDescription = styled.div`
    margin-top: 25px;
    width: 50%;
    max-width: 500px;

    a {
        ${mixins.inlineLink};
    }
`;

const StyledContactLink = styled(Link)`
    ${mixins.bigButton};
    margin-top: 50px;
`;

function Hero({ data }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 1000);
        return () => clearTimeout(timeout);
    }, []);

    const { name, role, subtitle, title, _rawDescription } = data[0].node;

    const one = () => <StyledOverline style={{ transitionDelay: '150ms' }}>{title}</StyledOverline>;
    const two = () => <StyledTitle style={{ transitionDelay: '300ms' }}>{name}</StyledTitle>;
    const three = () => <StyledRole style={{ transitionDelay: '450ms' }}>{role}</StyledRole>;
    const four = () => (
        <StyledSubtitle style={{ transitionDelay: '600ms' }}>{subtitle}</StyledSubtitle>
    );
    const five = () => (
        <StyledDescription style={{ transitionDelay: '750ms' }}>
            {_rawDescription && <PortableTextBlock value={_rawDescription || []} />}
        </StyledDescription>
    );
    const six = () => (
        <div style={{ transitionDelay: '900ms' }}>
            <StyledContactLink to="/#contact">Get In Touch</StyledContactLink>
        </div>
    );

    const items = [one, two, three, four, five, six];

    return (
        <StyledContainer>
            <TransitionGroup component={null}>
                {isMounted &&
                    items.map((item, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <CSSTransition key={i} classNames="fadeup" timeout={3000}>
                            {item}
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </StyledContainer>
    );
}

Hero.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Hero;
