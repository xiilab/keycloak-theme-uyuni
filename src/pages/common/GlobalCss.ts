import { createGlobalStyle, css } from 'styled-components'

export const GlobalCss = createGlobalStyle`
  ${({ theme }) => css`
    html {
      height: 100%;

      body {
        height: 100%;
        background-image: linear-gradient(to left, #04aafb, #136fe4);

        #root {
          height: 100%;
          overflow: hidden;
        }
      }
    }
  `}
`

export default GlobalCss
