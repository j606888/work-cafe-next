import "../styles/globals.css"
import { FilterProvider } from "contexts/FilterContext"
import { Provider } from 'react-redux'
import store from "redux/store"

function MyApp({ Component, pageProps }) {
  return (
    <FilterProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </FilterProvider>
  )
}

export default MyApp
