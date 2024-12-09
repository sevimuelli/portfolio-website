import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiveWrapper } from '@components';
import { theme, mixins, Button } from '@styles';

const { colors } = theme;

const StyledContainer = styled.div`
    ${mixins.flexCenter};
    background-color: ${colors.lightNavy};
    /* background-color: green; */
    position: fixed;
    width: 100%;
    height: 100%;
    transition: top 1.5s cubic-bezier(0.46, 0.13, 0.96, 0.3);
    /* top: 0; */
    top: ${(props) => (props.$slideDown ? '100%' : '0%')};
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
`;

// const StyledWrapper = styled.div`
//     width: 800px;
//     height: 800px;
//     position: absolute;
//     top: 0;
// `;

const StyledButton = styled(Button)`
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px;
    z-index: 10;
`;

function LoadingScreen({ finishLoading, moveLogo, showLogo, riveURL }) {
    const [slideDown, setSlideDown] = useState(false);
    const [skip, setSkip] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => setIsMounted(true), 10);
    // });

    return (
        <StyledContainer className="loader" $slideDown={slideDown}>
            <StyledButton onClick={() => setSkip(true)}>SKIP</StyledButton>
            {/* <StyledWrapper> */}
            <RiveWrapper
                finishLoading={() => {
                    finishLoading();
                    setSlideDown(true);
                }}
                moveLogo={moveLogo}
                showLogo={showLogo}
                // riveURL={data.riveFile.edges[0].node.loadingScreen.asset.url}
                riveURL={riveURL}
                skip={skip}
            />
            {/* </StyledWrapper> */}
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
