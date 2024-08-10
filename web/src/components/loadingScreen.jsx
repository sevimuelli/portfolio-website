import React, { useState, useEffect } from 'react';
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
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
`;

// const StyledAnimation = styled.div`
//     width: 100%;
//     height: 100%;
//     transition: ${theme.transition};
//     opacity: ${(props) => (props.$isMounted ? 1 : 0)};
// `;

function LoadingScreen({ finishLoading }) {
    // const [isMounted, setIsMounted] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => setIsMounted(true), 10);
    // });

    return (
        <StyledContainer className="loader">
            {/* <StyledAnimation $isMounted={isMounted}> */}
            <RiveWrapper finishLoading={finishLoading} />
            {/* </StyledAnimation> */}
        </StyledContainer>
    );
}

LoadingScreen.propTypes = {
    finishLoading: PropTypes.func.isRequired,
};

export default LoadingScreen;
