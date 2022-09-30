import "../styles/globals.css"
import { SWRConfig } from "swr"
import { fetcher } from "api"
import { ThemeProvider } from "styled-components"
import styledTheme from "constant/styled-theme"

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
