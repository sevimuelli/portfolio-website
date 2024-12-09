import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    useRive,
    Layout,
    Fit,
    Alignment,
    EventType,
    RiveEventType,
    useStateMachineInput,
} from '@rive-app/react-canvas';
// import riveAnimation from '@images/vehicles.riv';
// import bla from '../rive/vehicles.riv?url';

// Wrapper component to isolate useRive logic that
// renders the <RiveComponent />
function RiveWrapper({ finishLoading, moveLogo, showLogo, riveURL, skip }) {
    const { rive, RiveComponent } = useRive({
        // src: riveURL,
        src: 'layout_test.riv',
        // src: riveAnimation,
        // src: 'vehicles.riv',
        stateMachines: 'State Machine',
        autoplay: true,
        layout: new Layout({
            fit: Fit.Layout,
        }),
    });

    // const externalScale = useStateMachineInput(rive, 'State Machine', 'Scale');
    const skipRiveContent = useStateMachineInput(rive, 'State Machine', 'SkipAnimation');

    const onRiveEventReceived = (riveEvent) => {
        const eventData = riveEvent.data;
        // const eventProperties = eventData.properties;
        if (eventData.type === RiveEventType.General) {
            console.log('Event name', eventData.name);
            if (eventData.name === 'FinishLoading') {
                setTimeout(() => finishLoading(), 2000);
                setTimeout(() => moveLogo(), 1000);
                showLogo();
            }
            if (eventData.name === 'moveLogo') {
                moveLogo();
            }
            if (eventData.name === 'ShowLogo') {
                showLogo();
            }
        }
    };

    // const [windowDimensions, setWindowDimensions] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // });

    // const [scale, setScale] = useState(100);

    // useEffect(() => {
    //     const windowSizeHandler = () => {
    //         setWindowDimensions({
    //             width: window.innerWidth,
    //             height: window.innerHeight,
    //         });
    //     };
    //     window.addEventListener('resize', windowSizeHandler);
    //
    //     return () => {
    //         window.removeEventListener('resize', windowSizeHandler);
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //     if (externalScale) {
    //         if (windowDimensions.width <= 500) {
    //             setScale(80);
    //         }
    //         if (windowDimensions.width <= 400) {
    //             setScale(60);
    //         }
    //         if (windowDimensions.height <= 600) {
    //             setScale(80);
    //         }
    //         if (windowDimensions.height <= 500) {
    //             setScale(60);
    //         }
    //         if (windowDimensions.height <= 400) {
    //             setScale(50);
    //         }
    //         externalScale.value = scale;
    //     }
    // }, [externalScale, scale, windowDimensions]);

    // Wait until the rive object is instantiated before adding the Rive
    // event listener
    useEffect(() => {
        if (rive) {
            rive.on(EventType.RiveEvent, onRiveEventReceived);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rive]);

    useEffect(() => {
        if (skip === true) {
            console.log('skip button pressed!');
            skipRiveContent.fire();
        }
    }, [skip, skipRiveContent]);

    return <RiveComponent />;
}

RiveWrapper.propTypes = {
    finishLoading: PropTypes.func.isRequired,
    moveLogo: PropTypes.func.isRequired,
    showLogo: PropTypes.func.isRequired,
    riveURL: PropTypes.string.isRequired,
    skip: PropTypes.bool.isRequired,
};

export default RiveWrapper;
