import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { LoadingScreen, Nav, Social, Footer } from '@components';
import styled from 'styled-components';
import { GlobalStyle, media } from '@styles';
import { IconLogo } from '@components/icons';

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    require('smooth-scroll')('a[href*="#"]');
}

const StyledLogo = styled.div`
    width: 90px;
    height: 90px;
    top: -5px;
    position: absolute;
    z-index: 100;
    margin-left: 50px;
    ${media.desktop`margin-left: 40px;`};
    ${media.tablet`margin-left: 25px;`};

    transition: left 0.4s cubic-bezier(0.08, 0.51, 0.86, 1.17);
    left: ${(props) => (props.$slideLogo ? 0 : props.$slideWidth)};
    display: ${(props) => (props.$showLogo ? 'block' : 'none')};

    svg {
        user-select: none;
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
    // if (navigator.userAgent.indexOf('Chrome-Lighthouse') > -1) {
    //     console.log('Lighthouse!');
    // } else {
    //     console.log('No lighthouse :(');
    // }
    if (typeof window !== 'undefined') {
        shouldLoad = !window.sessionStorage.getItem('beenHere');
        window.onbeforeunload = () => {
            sessionStorage.setItem('origin', window.location.href);
        };
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href === sessionStorage.getItem('origin')) {
                sessionStorage.removeItem('beenHere');
            }
        }
    }, []);
    const [isLoading, setIsLoading] = useState(shouldLoad && isHome);
    const [showContent, setShowContent] = useState(!shouldLoad);
    const [slideLogo, setSlideLogo] = useState(false);
    const [showLogo, setShowLogo] = useState(false);

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
            rive: allSanitySiteSettings {
                edges {
                    node {
                        loadingScreen {
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
            <GlobalStyle />

            {isLoading && isHome && (
                <div>
                    <LoadingScreen
                        riveURL={data.rive.edges[0].node.loadingScreen.asset.url}
                        moveLogo={() => {
                            setSlideLogo(true);
                        }}
                        showLogo={() => {
                            setShowLogo(true);
                        }}
                        finishLoading={() => {
                            setShowContent(true);
                            setTimeout(() => setIsLoading(false), 2000);
                            sessionStorage.setItem('beenHere', true);
                        }}
                    />
                    <StyledLogo $slideLogo={slideLogo} $showLogo={showLogo} $slideWidth="300px">
                        <IconLogo />
                    </StyledLogo>
                </div>
            )}
            {showContent && (
                <StyledContent id="layout">
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
