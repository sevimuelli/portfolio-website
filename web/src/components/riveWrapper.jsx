import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

// Wrapper component to isolate useRive logic that
// renders the <RiveComponent />
function RiveWrapper({ finishLoading, riveURL }) {
    const { RiveComponent } = useRive({
        src: riveURL,
        // src: 'vehicles.riv',
        stateMachines: 'bumpy',
        autoplay: true,
        layout: new Layout({
            fit: Fit.Fill,
            alignment: Alignment.Center,
        }),
    });

    useEffect(() => {
        setTimeout(() => finishLoading(), 7000);
    });

    return <RiveComponent />;
}

RiveWrapper.propTypes = {
    finishLoading: PropTypes.func.isRequired,
    riveURL: PropTypes.func.isRequired,
};

export default RiveWrapper;
