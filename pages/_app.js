import "../styles/globals.css"
import { SWRConfig } from "swr"
import { fetcher } from "api"

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
