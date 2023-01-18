import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  ${({ theme }) => css`
    @font-face {
      font-family: 'Ubuntu';
      src: local('../assets/fonts/ubuntu/Ubuntu-Regular.ttf') format('ttf'),
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Ubuntu-Light';
      src: local('../assets/fonts/ubuntu/Ubuntu-Light.ttf') format('ttf'),
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Ubuntu-Regular';
      src: local('../assets/fonts/ubuntu/Ubuntu-Regular.ttf') format('ttf'),
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
  `}
`
