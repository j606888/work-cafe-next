import "../styles/globals.css"
import { FilterProvider } from "contexts/FilterContext"

function MyApp({ Component, pageProps }) {
  return (
    <FilterProvider>
      <Component {...pageProps} />
    </FilterProvider>
  )
}

export default MyApp
