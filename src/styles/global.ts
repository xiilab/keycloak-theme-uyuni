import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  ${({ theme }) => css`
    html {
      width: 100%;
      height: 100%;
      body {
        margin: 0;
        color: rgb(34, 51, 84);
        font-size: 14px;
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol';
        font-weight: 400;
        line-height: 1.5;
        width: 100%;
        height: 100%;
      }
      #root {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
    .css-11pb1sy-MuiContainer-root {
      margin-top: 1%;
    }
    .CircularProgressbar-path:not(.children-gauge-chart
        svg
        .CircularProgressbar-path) {
      stroke: url(#gauge-gradient);
    }
  `}
`
