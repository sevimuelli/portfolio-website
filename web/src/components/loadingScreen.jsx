import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiveWrapper } from '@components';
import { theme, mixins } from '@styles';

const { colors } = theme;

const StyledContainer = styled.div`
    ${mixins.flexCenter};
    background-color: ${colors.darkNavy};
    position: fixed;
    width: 100%;
    height: 100%;
    transition: top 2s;
    /* top: 0; */
    top: ${(props) => (props.$slideDown ? '100%' : '0%')};
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
`;

function LoadingScreen({ finishLoading, riveURL }) {
    const [slideDown, setSlideDown] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => setIsMounted(true), 10);
    // });

    return (
        <StyledContainer className="loader" $slideDown={slideDown}>
            <RiveWrapper
                finishLoading={() => {
                    finishLoading();
                    setSlideDown(true);
                }}
                // riveURL={data.riveFile.edges[0].node.loadingScreen.asset.url}
                riveURL={riveURL}
            />
        </StyledContainer>
    );
}

LoadingScreen.propTypes = {
    finishLoading: PropTypes.func.isRequired,
    riveURL: PropTypes.func.isRequired,
};

export default LoadingScreen;
