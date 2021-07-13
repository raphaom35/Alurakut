import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    background-image:  url("https://images.alphacoders.com/989/thumb-1920-989335.png")
  }
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  img{
    max-width:100%;
    height:auto;
    display:block;
  }
  ${AlurakutStyles}
}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
