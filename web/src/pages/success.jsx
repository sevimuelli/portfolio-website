import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { Layout, SEO } from '@components';
import styled from 'styled-components';
import { theme, mixins, media, Main } from '@styles';

const { colors, fonts } = theme;

const StyledMainContainer = styled(Main)`
    ${mixins.flexCenter};
    flex-direction: column;
`;

const StyledTitle = styled.h3`
    color: ${colors.green};
    font-family: ${fonts.SFMono};
    font-size: 8vw;
    line-height: 1;
    ${media.bigDesktop`font-size: 60px;`}
    ${media.phablet`font-size: 40px;`};
`;

const StyledSubtitle = styled.h2`
    font-size: 3vw;
    font-weight: 400;
    ${media.bigDesktop`font-size: 30px;`};
    ${media.thone`font-size: 20px;`};
    ${media.phablet`font-size: 20px;`};
`;

const StyledHomeButton = styled(Link)`
    ${mixins.bigButton};
    margin-top: 40px;
`;

const Success = ({ location }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Layout location={location}>
            <SEO siteTitle="Success page" sitePath="/success" />
            <TransitionGroup component={null}>
                {isMounted && (
                    <CSSTransition timeout={500} classNames="fade">
                        <StyledMainContainer className="fillHeight">
                            <StyledTitle>Thank you!</StyledTitle>
                            <StyledSubtitle>Your form submission has been received.</StyledSubtitle>
                            <StyledHomeButton to="/">Go Home</StyledHomeButton>
                        </StyledMainContainer>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </Layout>
    );
};

export default Success;
