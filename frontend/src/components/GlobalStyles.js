import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-main-blue: #646FD4;
    --color-main-white: #FFFFFF;
    --color-main-brown:#ded7b1;
    --color-main-gray: #dddddd; 
    --color-point-pink:  #f54748;
    --color-font-darkgray: #393e46;
    --color-filter-background: #BDE6F1;
    --font-poppins: 'Poppins', sans-serif;
    --font-roboto: 'Roboto', sans-serif;
}

html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }

ol, ul {
      list-style: none;
  }

body {
  width: 100%;
}

`;
