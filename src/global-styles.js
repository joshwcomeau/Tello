import { fontFace, injectGlobal } from 'react-emotion';

import { COLORS } from './constants';

injectGlobal`
  html, body {
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Raleway",
      "Segoe UI",
      "Roboto",
      "Roboto Light",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: ${COLORS.white};
    background: ${COLORS.gray.veryDark};
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  html, body, div, span,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, em, img, strong, sub, sup, ol, ul, li,
  form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, section, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 100%;
  	vertical-align: baseline;
  }

  ::-moz-selection { /* Code for Firefox */
    color: #FFF;
    background: ${COLORS.pink.primary};
  }

  ::selection {
    color: #FFF;
    background: ${COLORS.pink.primary};
  }
`;

fontFace`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 500;
  src: local('Raleway Medium'), local('Raleway-Medium'), url(https://fonts.gstatic.com/s/raleway/v11/CcKI4k9un7TZVWzRVT-T8wzyDMXhdD8sAj6OAJTFsBI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`;

fontFace`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  src: local('Raleway Bold'), local('Raleway-Bold'), url(https://fonts.gstatic.com/s/raleway/v11/JbtMzqLaYbbbCL9X6EvaIwzyDMXhdD8sAj6OAJTFsBI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`;
