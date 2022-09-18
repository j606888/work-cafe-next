import "../styles/globals.css"
import { Provider } from "react-redux"
import store from "store/createStore"
import { SWRConfig } from "swr"
import { fetcher } from "api"

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  )
}

export default MyApp
