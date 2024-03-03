import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Head, Loader, Nav, Social, Footer } from '@components';
import styled from 'styled-components';
import { GlobalStyle, theme } from '@styles';

const { colors, fontSizes, fonts } = theme;
// const isProd = process.env.NODE_ENV === 'production';

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    require('smooth-scroll')('a[href*="#"]');
}

const SkipToContent = styled.a`
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:hover {
        background-color: ${colors.darkGrey};
    }

    &:focus,
    &:active {
        outline: 0;
        color: ${colors.green};
        background-color: ${colors.lightNavy};
        border-radius: ${theme.borderRadius};
        padding: 18px 23px;
        font-size: ${fontSizes.sm};
        font-family: ${fonts.SFMono};
        line-height: 1;
        text-decoration: none;
        cursor: pointer;
        transition: ${theme.transition};
        top: 0;
        left: 0;
        width: auto;
        height: auto;
        overflow: auto;
        z-index: 99;
    }
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default function Layout({ children, location }) {
    const isHome = location.pathname === '/';
    let shouldLoad = true;
    if (typeof window !== 'undefined') {
        shouldLoad = !window.sessionStorage.getItem('beenHere');
    }
    const [isLoading, setIsLoading] = useState(shouldLoad && isHome);
    useEffect(() => {
        if (isLoading || isHome) {
            return;
        }
        if (location.hash) {
            const id = location.hash.substring(1); // location.hash without the '#'
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView();
                }
            }, 0);
        }
    }, [isHome, isLoading, location.hash]);

    const data = useStaticQuery(graphql`
        query LayoutQuery {
            site {
                siteMetadata {
                    title
                    siteUrl
                    description
                }
            }
            resumeFile: allSanityAboutMe {
                edges {
                    node {
                        myFiles {
                            asset {
                                url
                            }
                        }
                    }
                }
            }
        }
    `);

    return (
        <div id="root">
            <Head metadata={data.site.siteMetadata} />

            <GlobalStyle />

            <SkipToContent href="#content">Skip to Content</SkipToContent>

            {isLoading && isHome ? (
                <Loader
                    finishLoading={() => {
                        setIsLoading(false);
                        sessionStorage.setItem('beenHere', true);
                    }}
                />
            ) : (
                <StyledContent>
                    <Nav
                        isHome={isHome}
                        fileURL={data.resumeFile.edges[0].node.myFiles[0].asset.url}
                    />
                    <Social isHome={isHome} />

                    <div id="content">
                        {children}
                        <Footer />
                    </div>
                </StyledContent>
            )}
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
};
