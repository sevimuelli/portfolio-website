import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiveWrapper } from '@components';
import { theme, mixins } from '@styles';

const { colors } = theme;

const StyledContainer = styled.div`
    ${mixins.flexCenter};
    background-color: ${colors.lightNavy};
    position: fixed;
    width: 100%;
    height: 100%;
    transition: top 1.5s cubic-bezier(0.46, 0.13, 0.96, 0.3);
    top: ${(props) => (props.$slideDown ? '100%' : '0%')};
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
`;

function LoadingScreen({ finishLoading, moveLogo, showLogo, riveURL }) {
    const [slideDown, setSlideDown] = useState(false);

    return (
        <StyledContainer className="loader" $slideDown={slideDown}>
            <RiveWrapper
                finishLoading={() => {
                    finishLoading();
                    setSlideDown(true);
                }}
                moveLogo={moveLogo}
                showLogo={showLogo}
                riveURL={riveURL}
            />
        </StyledContainer>
    );
}

LoadingScreen.propTypes = {
    finishLoading: PropTypes.func.isRequired,
    moveLogo: PropTypes.func.isRequired,
    showLogo: PropTypes.func.isRequired,
    riveURL: PropTypes.string.isRequired,
};

export default LoadingScreen;
