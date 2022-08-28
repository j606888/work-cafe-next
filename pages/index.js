import About from "features/About";
import CityQuickSearch from "features/CityQuickSearch";
import Header from "features/Header";
import Hero from "features/Hero";

export default function RootPage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <CityQuickSearch />
    </>
  )
}
