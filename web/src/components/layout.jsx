import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { LoadingScreen, Nav, Social, Footer } from '@components';
import styled from 'styled-components';
import { GlobalStyle } from '@styles';

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    require('smooth-scroll')('a[href*="#"]');
}

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
            <GlobalStyle />

            {isLoading && isHome ? (
                <LoadingScreen
                    finishLoading={() => {
                        setIsLoading(false);
                        sessionStorage.setItem('beenHere', true);
                    }}
                />
            ) : (
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
