import "../styles/globals.css"
import { SWRConfig } from "swr"
import { fetcher } from "api"
import { ThemeProvider } from "styled-components"
import styledTheme from "constant/styled-theme"

if (typeof window === 'undefined') {
  const { server } = require('../mocks/server')
  server.listen()
} else {
  const { worker } = require('../mocks/browser')
  worker.start()
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <ThemeProvider theme={styledTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}

export default MyApp
