import "../styles/globals.css"
import { SWRConfig } from "swr"
import { fetcher } from "api"
import { ThemeProvider } from "styled-components"
import styledTheme from "constant/styled-theme"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <SWRConfig
        value={{
          fetcher,
          errorRetryCount: 5,
        }}
      >
        <ThemeProvider theme={styledTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
