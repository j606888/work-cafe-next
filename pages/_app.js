import "../styles/globals.css"
import { SWRConfig } from "swr"
import { fetcher } from "api"
import { ThemeProvider } from "styled-components"
import styledTheme from "constants/styled-theme"
import Head from "next/head"
import mixpanel from "mixpanel-browser"
import { useEffect } from "react"

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API_KEY || '', { debug: true })

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    mixpanel.track('page-view')
  }, [])
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
          {Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
