import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    useRive,
    Layout,
    Fit,
    EventType,
    RiveEventType,
    useStateMachineInput,
} from '@rive-app/react-canvas';

// Wrapper component to isolate useRive logic that
// renders the <RiveComponent />
function RiveWrapper({ finishLoading, moveLogo, showLogo, riveURL }) {
    const { rive, RiveComponent } = useRive({
        // src: riveURL,
        src: 'loadingscreen.riv',
        // src: riveAnimation,
        // src: 'vehicles.riv',
        stateMachines: 'State Machine',
        autoplay: true,
        layout: new Layout({
            fit: Fit.Layout,
        }),
    });

    const riveAnimationXPos = useStateMachineInput(rive, 'State Machine', 'Move animation X');
    const riveAnimationYPos = useStateMachineInput(rive, 'State Machine', 'Move animation Y');
    const skipRiveContent = useStateMachineInput(rive, 'State Machine', 'SkipAnimation');
    // const ladderSize = useStateMachineInput(rive, 'State Machine', 'AnimationBoard.Ladder size');

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
            if (eventData.name === 'MoveLogo') {
                moveLogo();
            }
            if (eventData.name === 'ShowLogo') {
                showLogo();
            }
            if (eventData.name === 'MoveCanvas') {
                finishLoading();
            }
        }
    };

    const [windowDimensions, setWindowDimensions] = useState({
        width: 1000,
        height: 1000,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
    }, []);

    const [scale, setScale] = useState(1);

    const [animationXPos, setAnimationXPos] = useState(0);
    const [animationYPos, setAnimationYPos] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const windowSizeHandler = () => {
                setWindowDimensions({
                    width: window.innerWidth || 500,
                    height: window.innerHeight || 500,
                });
            };
            window.addEventListener('resize', windowSizeHandler);

            return () => {
                window.removeEventListener('resize', windowSizeHandler);
            };
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (riveAnimationXPos && riveAnimationYPos && rive) {
            setScale(0.7);
            if (windowDimensions.width <= 500) {
                setScale(0.5);
            }
            if (windowDimensions.height <= 600) {
                setScale(0.5);
            }
            const xPos = windowDimensions.width * 0.5;
            const yPos = windowDimensions.height * 0.7;
            setAnimationXPos(xPos - 500);
            setAnimationYPos(700 - yPos);
            riveAnimationXPos.value = animationXPos;
            riveAnimationYPos.value = animationYPos;
            // ladderSize.value = windowDimensions.height * 0.7 - 50;
            rive?.setNumberStateAtPath(
                'Ladder size',
                windowDimensions.height * 0.7 * 0.97,
                'Animation Board',
            );
            rive?.setNumberStateAtPath(
                'Top distance',
                (windowDimensions.height / scale) * 0.7 - 340,
                'Animation Board',
            );
            rive?.setNumberStateAtPath('Scale', scale, 'Animation Board');
        }
    }, [
        riveAnimationXPos,
        riveAnimationYPos,
        animationXPos,
        animationYPos,
        windowDimensions,
        rive,
        scale,
    ]);

    // Wait until the rive object is instantiated before adding the Rive
    // event listener
    useEffect(() => {
        if (rive) {
            rive.on(EventType.RiveEvent, onRiveEventReceived);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rive]);

    return <RiveComponent />;
}

RiveWrapper.propTypes = {
    finishLoading: PropTypes.func.isRequired,
    moveLogo: PropTypes.func.isRequired,
    showLogo: PropTypes.func.isRequired,
    riveURL: PropTypes.string.isRequired,
};

export default RiveWrapper;
