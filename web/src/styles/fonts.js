import { css } from 'styled-components';

import CalibreLightWOFF2 from '@fonts/Calibre/Calibre-Light.woff2';
import CalibreLightItalicWOFF2 from '@fonts/Calibre/Calibre-LightItalic.woff2';
import CalibreRegularWOFF2 from '@fonts/Calibre/Calibre-Regular.woff2';
import CalibreRegularItalicWOFF2 from '@fonts/Calibre/Calibre-RegularItalic.woff2';
import CalibreMediumWOFF2 from '@fonts/Calibre/Calibre-Medium.woff2';
import CalibreMediumItalicWOFF2 from '@fonts/Calibre/Calibre-MediumItalic.woff2';
import CalibreSemiboldWOFF2 from '@fonts/Calibre/Calibre-Semibold.woff2';
import CalibreSemiboldItalicWOFF2 from '@fonts/Calibre/Calibre-SemiboldItalic.woff2';

import SFMonoRegularWOFF2 from '@fonts/SFMono/SFMono-Regular.woff2';
import SFMonoRegularItalicWOFF2 from '@fonts/SFMono/SFMono-RegularItalic.woff2';
import SFMonoMediumWOFF2 from '@fonts/SFMono/SFMono-Medium.woff2';
import SFMonoMediumItalicWOFF2 from '@fonts/SFMono/SFMono-MediumItalic.woff2';
import SFMonoSemiboldWOFF2 from '@fonts/SFMono/SFMono-Semibold.woff2';
import SFMonoSemiboldItalicWOFF2 from '@fonts/SFMono/SFMono-SemiboldItalic.woff2';

const FontFaces = css`
    @font-face {
        font-family: 'Calibre';
        src: url(${CalibreLightWOFF2}) format('woff2');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Calibre';
        src: url(${CalibreLightItalicWOFF2}) format('woff2');
        font-weight: 300;
        font-style: italic;
        font-display: swap;
        font-display: swap;
    }
    @font-face {
        font-family: 'Calibre';
        src: url(${CalibreRegularWOFF2}) format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Calibre';
        src: url(${CalibreRegularItalicWOFF2}) format('woff2');
        font-weight: normal;
        font-style: italic;
        font-display: swap;
    }
    @font-face {
        font-family: 'Calibre';
        src: url(${CalibreMediumWOFF2}) format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Calibre';
        src: url(${CalibreMediumItalicWOFF2}) format('woff2');
        font-weight: 500;
        font-style: italic;
        font-display: swap;
    }
    @font-face {
        font-family: 'Calibre';
        src: url(${CalibreSemiboldWOFF2}) format('woff2');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Calibre';
        src: url(${CalibreSemiboldItalicWOFF2}) format('woff2');
        font-weight: 600;
        font-style: italic;
        font-display: swap;
    }
    @font-face {
        font-family: 'SF Mono';
        src: url(${SFMonoRegularWOFF2}) format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'SF Mono';
        src: url(${SFMonoRegularItalicWOFF2}) format('woff2');
        font-weight: normal;
        font-style: italic;
        font-display: swap;
    }
    @font-face {
        font-family: 'SF Mono';
        src: url(${SFMonoMediumWOFF2}) format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'SF Mono';
        src: url(${SFMonoMediumItalicWOFF2}) format('woff2');
        font-weight: 500;
        font-style: italic;
        font-display: swap;
    }
    @font-face {
        font-family: 'SF Mono';
        src: url(${SFMonoSemiboldWOFF2}) format('woff2');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'SF Mono';
        src: url(${SFMonoSemiboldItalicWOFF2}) format('woff2');
        font-weight: 600;
        font-style: italic;
        font-display: swap;
    }
`;

export default FontFaces;
