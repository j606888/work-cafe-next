import "../styles/globals.css"
import { SWRConfig } from "swr"
import { fetcher } from "api"
import { ThemeProvider } from "styled-components"
import styledTheme from "constants/styled-theme"
import Head from "next/head"
import mixpanel from "mixpanel-browser"
import { useEffect } from "react"
import useUserStore from "stores/useUserStore"
import track, { TRACK_NAME_MAP } from "constants/event-track"
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API_KEY || '')

function MyApp({ Component, pageProps }) {
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    if (user && user.user_id !== mixpanel.get_distinct_id()) {
      mixpanel.identify(user.user_id)
      mixpanel.people.set({
        $email: user.email,
        $name: user.name,
      })
    }
    track(TRACK_NAME_MAP.PAGE_VIEW, { page: window.location.pathname })
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
