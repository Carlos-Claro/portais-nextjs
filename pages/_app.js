import { SessionProvider } from "next-auth/react"
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persisetdStore } from '../src/store'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
  h1 {
    padding-top: 70px;
    color: blueviolet;
    font-weight: 500;
    font-size: 1em;
  }
  h2 {
    padding-top: 10px;
    font-size: 1em;
    font-weight: 500;
    color: red;
  }
  .MuiContainer-root {
    padding-right: 2px;
    padding-left: 2px;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate persistor={persisetdStore} >
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
    </>
  )
}
